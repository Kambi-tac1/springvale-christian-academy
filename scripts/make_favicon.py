from PIL import Image
from pathlib import Path

# Paths (assumes script runs from project root)
src = Path('logo.jpg')
sizes = {
    'favicon-16x16.png': (16, 16),
    'favicon-32x32.png': (32, 32),
    'apple-touch-icon-180x180.png': (180, 180),
}
ico_path = Path('favicon.ico')

if not src.exists():
    print(f"Source image not found: {src.resolve()}")
    raise SystemExit(1)

with Image.open(src) as im:
    im = im.convert('RGBA')

    generated = []
    for name, size in sizes.items():
        out = Image.new('RGBA', size, (0, 0, 0, 0))
        thumb = im.copy()
        thumb.thumbnail(size, Image.LANCZOS)
        w, h = thumb.size
        out.paste(thumb, ((size[0]-w)//2, (size[1]-h)//2), thumb if thumb.mode == 'RGBA' else None)
        out.save(name, format='PNG')
        generated.append(Path(name).resolve())
        print(f"Saved {name}")

    # Create multi-size ICO (include 16 and 32, and 48 if available)
    ico_sizes = [(16, 16), (32, 32), (48, 48)]
    icons = []
    for s in ico_sizes:
        tmp = im.copy()
        tmp.thumbnail(s, Image.LANCZOS)
        icons.append(tmp.convert('RGBA'))

    icons[0].save(ico_path, format='ICO', sizes=[(16,16),(32,32),(48,48)])
    generated.append(ico_path.resolve())
    print(f"Saved {ico_path}")

    print('\nGenerated files:')
    for p in generated:
        print(p)
