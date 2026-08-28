# jiale-cheng.github.io

This repository contains the source for [Jiale Cheng's personal academic website](https://jiale-cheng.github.io), published with GitHub Pages.

The site includes:

- current research, education, publications, and contact information;
- a downloadable curriculum vitae;
- notes and posts on information theory, communications, mathematics, and related topics; and
- archived material retained from earlier versions of the site.

## Editing and deployment

The site is built with Jekyll and deployed from the `main` branch through GitHub Pages. Site-wide information is stored in `_config.yml`; the homepage and academic profile are maintained in `index.html` and `about/index.md`.

For a local preview, install the bundle and run:

```sh
bundle install
bundle exec jekyll serve
```

After a production build, internal links can be checked with:

```sh
python3 scripts/check_internal_links.py _site
```

## Reuse and attribution

The source code is open source. See [LICENSE.md](LICENSE.md) for licensing terms and acknowledgements for third-party components used by the theme.
