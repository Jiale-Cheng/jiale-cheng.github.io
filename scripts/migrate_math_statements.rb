#!/usr/bin/env ruby
# frozen_string_literal: true

require "cgi"

KINDS = %w[theorem lemma proposition corollary definition axiom remark example proof].freeze
NAMES = KINDS.to_h { |kind| [kind, kind.capitalize] }.freeze
GROUPS = {
  "theorem" => "result",
  "lemma" => "result",
  "proposition" => "result",
  "corollary" => "result",
  "definition" => "definition",
  "axiom" => "axiom",
  "remark" => "remark",
  "example" => "example"
}.freeze

MARKER = /^\*\*(Theorem|Lemma|Proposition|Corollary|Definition|Axiom|Remark|Example|Proof)\b(.*?)\*\*(.*)$/i
INLINE_REMARK = /^\*\s+Remark:\s*(.+)$/i
HEADING = /^\#{1,6}\s+/
SECTION_HEADING = /^##\s+/

Marker = Struct.new(
  :line_index,
  :kind,
  :old_number,
  :title,
  :body,
  :consume_next,
  :section,
  :counter,
  :label,
  :id,
  :single_line,
  keyword_init: true
)

def reset_counters
  { "result" => 0, "definition" => 0, "axiom" => 0, "remark" => 0, "example" => 0 }
end

def clean_title(value)
  value.to_s.strip.sub(/\A\(/, "").sub(/\)\z/, "").strip
end

def parse_marker(line, next_line, line_index)
  if (match = line.match(INLINE_REMARK))
    return Marker.new(
      line_index: line_index,
      kind: "remark",
      body: match[1].strip,
      consume_next: false,
      single_line: true
    )
  end

  match = line.match(MARKER)
  return unless match

  kind = match[1].downcase
  inside = match[2].strip
  after = match[3].to_s.strip

  old_number = nil
  if (number_match = inside.match(/\A(\d+(?:\.\d+)*)\b/))
    old_number = number_match[1]
    inside = inside[number_match[0].length..].to_s.strip
  end

  inside = inside.sub(/[.:]\z/, "").strip
  title = inside.match?(/\A\(.*\)\z/) ? clean_title(inside) : nil
  body = after

  if title.nil? && (title_match = after.match(/\A\s*\((.+)\)\s*:?[.]?\s*(?:<br>)?\s*(.*)\z/i))
    title = clean_title(title_match[1])
    body = title_match[2].to_s.strip
  end

  consume_next = false
  if title.nil? && body.empty? && next_line
    if (title_match = next_line.match(/\A\s*\((.+)\)\s*:\s*(?:<br>)?\s*(.*)\z/i))
      title = clean_title(title_match[1])
      body = title_match[2].to_s.strip
      consume_next = true
    end
  end

  body = body.sub(/\A:<br>\s*/i, "").sub(/\A<br>\s*/i, "").strip

  Marker.new(
    line_index: line_index,
    kind: kind,
    old_number: old_number,
    title: title,
    body: body,
    consume_next: consume_next,
    single_line: false
  )
end

def collect_markers(lines)
  markers = {}
  section = 0
  counters = reset_counters

  lines.each_index do |index|
    if lines[index].match?(SECTION_HEADING)
      section += 1
      counters = reset_counters
    end

    marker = parse_marker(lines[index], lines[index + 1], index)
    next unless marker

    unless marker.kind == "proof"
      section = 1 if section.zero?
      group = GROUPS.fetch(marker.kind)
      counters[group] += 1
      marker.section = section
      marker.counter = counters[group]
      marker.label = "#{NAMES.fetch(marker.kind)} #{section}.#{marker.counter}"
      marker.id = "#{marker.kind}-#{section}-#{marker.counter}"
    end

    markers[index] = marker
  end

  markers
end

def reference_map(markers)
  grouped = Hash.new { |hash, key| hash[key] = [] }

  markers.each_value do |marker|
    next unless marker.old_number && marker.label

    grouped["#{NAMES.fetch(marker.kind)} #{marker.old_number}"] << marker
  end

  grouped.each_with_object({}) do |(old_label, matches), references|
    next unless matches.length == 1

    marker = matches.first
    references[old_label] = { "label" => marker.label, "id" => marker.id }
  end
end

def replace_references(line, references)
  references.keys.sort_by { |key| -key.length }.reduce(line) do |result, old_label|
    target = references.fetch(old_label)
    pattern = /(?<!\[)\b#{Regexp.escape(old_label)}\b/
    result.gsub(pattern, "[#{target.fetch('label')}](##{target.fetch('id')})")
  end
end

def heading_html(marker)
  if marker.kind == "proof"
    label = "Proof"
    title = marker.title.to_s.empty? ? "" : " <span class=\"math-statement__title\">(#{CGI.escapeHTML(marker.title)})</span>"
    return "<p class=\"math-statement__heading\"><span>#{label}</span>#{title}.</p>\n"
  end

  title = marker.title.to_s.empty? ? "" : " <span class=\"math-statement__title\">(#{CGI.escapeHTML(marker.title)})</span>"
  "<p class=\"math-statement__heading\"><span data-statement-label>#{marker.label}</span>#{title}.</p>\n"
end

def open_html(marker)
  if marker.kind == "proof"
    "<div class=\"math-proof\" markdown=\"1\">\n"
  else
    classes = "math-statement math-statement--#{marker.kind}"
    "<div class=\"#{classes}\" data-statement=\"#{marker.kind}\" id=\"#{marker.id}\" markdown=\"1\">\n"
  end
end

def migrate(lines, markers)
  references = reference_map(markers)
  output = []
  environment_open = false
  skip_index = nil

  close_environment = lambda do
    if environment_open
      output << "</div>\n"
      output << "\n"
      environment_open = false
    end
  end

  lines.each_index do |index|
    next if skip_index == index

    line = lines[index]
    marker = markers[index]

    if marker
      close_environment.call
      output << open_html(marker)
      output << heading_html(marker)
      output << "\n"
      output << "#{replace_references(marker.body, references)}\n" unless marker.body.empty?
      environment_open = true
      skip_index = index + 1 if marker.consume_next
      close_environment.call if marker.single_line
      next
    end

    close_environment.call if environment_open && line.match?(HEADING)
    output << replace_references(line, references)
  end

  close_environment.call
  output.join
end

def remove_base_indent(line)
  line.sub(/\A\t+/, "").sub(/\A {4}/, "")
end

def normalize_existing_environments(text)
  inside_environment = false
  math_closer = nil
  fence_character = nil
  changed_lines = 0

  normalized = text.lines.map do |line|
    if line.match?(/^<div class="math-(?:statement|proof)\b/)
      inside_environment = true
      math_closer = nil
      fence_character = nil
      next line
    end

    if inside_environment && line.match?(%r{^</div>})
      inside_environment = false
      math_closer = nil
      fence_character = nil
      next line
    end

    next line unless inside_environment

    stripped = line.lstrip
    stripped_content = stripped.chomp

    if fence_character
      if stripped_content.match?(/\A#{Regexp.escape(fence_character)}{3,}/)
        normalized_line = remove_base_indent(line)
        changed_lines += 1 if normalized_line != line
        fence_character = nil
        next normalized_line
      end
      next line
    end

    if (fence_match = stripped_content.match(/\A(`{3,}|~{3,})/))
      normalized_line = remove_base_indent(line)
      changed_lines += 1 if normalized_line != line
      fence_character = fence_match[1][0]
      next normalized_line
    end

    if math_closer
      math_closer = nil if stripped_content == math_closer
      next line
    end

    if stripped_content == "$$"
      normalized_line = remove_base_indent(line)
      changed_lines += 1 if normalized_line != line
      math_closer = "$$"
      next normalized_line
    end

    if stripped_content == "\\["
      normalized_line = remove_base_indent(line)
      changed_lines += 1 if normalized_line != line
      math_closer = "\\]"
      next normalized_line
    end

    normalized_line = remove_base_indent(line)
    changed_lines += 1 if normalized_line != line
    normalized_line
  end.join

  [normalized, changed_lines]
end

dry_run = ARGV.delete("--dry-run")
normalize_existing = ARGV.delete("--normalize-existing")
paths = Dir.glob("_posts/**/*.md").sort
changed_files = 0
statement_count = 0
normalized_files = 0
normalized_lines = 0

paths.each do |path|
  source = File.read(path)

  if normalize_existing
    source, changed_line_count = normalize_existing_environments(source)
    if changed_line_count.positive?
      normalized_files += 1
      normalized_lines += changed_line_count
      puts "#{dry_run ? 'Would normalize' : 'Normalized'} #{path}: #{changed_line_count} lines"
      File.write(path, source) unless dry_run
    end
  end

  lines = source.lines
  markers = collect_markers(lines)
  next if markers.empty?

  migrated = migrate(lines, markers)
  migrated, changed_line_count = normalize_existing_environments(migrated)
  normalized_files += 1 if changed_line_count.positive? && !normalize_existing
  normalized_lines += changed_line_count unless normalize_existing
  migrated = migrated.sub(/\n+\z/, "\n")
  changed_files += 1
  statement_count += markers.length
  puts "#{dry_run ? 'Would migrate' : 'Migrated'} #{path}: #{markers.length} environments"
  File.write(path, migrated) unless dry_run
end

puts "#{dry_run ? 'Would migrate' : 'Migrated'} #{statement_count} environments in #{changed_files} files."
puts "#{dry_run ? 'Would normalize' : 'Normalized'} #{normalized_lines} indented content lines in #{normalized_files} files."
