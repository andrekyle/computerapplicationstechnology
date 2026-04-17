import fitz
import os

doc = fitz.open(r'c:\Users\hp\Downloads\CAT Grade 10 Revision Term 1_2026.pdf')
out_dir = r'c:\Users\hp\Videos\computerapp-main\src\assets\exam-images'
os.makedirs(out_dir, exist_ok=True)

for i, page in enumerate(doc):
    images = page.get_images(full=True)
    if images:
        print(f"Page {i+1}: {len(images)} images")
        for j, img in enumerate(images):
            xref = img[0]
            base_image = doc.extract_image(xref)
            w = base_image["width"]
            h = base_image["height"]
            ext = base_image["ext"]
            data = base_image["image"]
            fname = f"page{i+1}_img{j+1}.{ext}"
            fpath = os.path.join(out_dir, fname)
            with open(fpath, "wb") as f:
                f.write(data)
            print(f"  Saved {fname} ({w}x{h})")
