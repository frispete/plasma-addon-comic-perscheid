Preparation
-----------
```
export pkg=pkgname
```

Build
-----
```
rm $pkg.comic
zip -rx\*~ -x\*.swp $pkg.comic $pkg
```

Install
-------
```
cp -va $pkg.comic ~/.local/share/plasma/comics/
pushd ~/.local/share/plasma/comics/
unzip $pkg.comic
popd
```

Test
----
```
plasmoidviewer -a org.kde.plasma.comic
```

Notes
-----
If things doesn't behave, remove cached files first:
```
rm -v ~/.local/share/plasma_engine_comic/$pkg*
```
The errors from the comic plasmoid are quite sparse, but an error
like xkcd:404 expresses a problem with xkcd comic strip #404.
