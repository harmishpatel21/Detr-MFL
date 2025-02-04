from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from PIL import Image
import io 
import os 
import base64


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    print("Here")
    os.makedirs("images", exist_ok=True)

    contents = await file.read()
    img = Image.open(io.BytesIO(contents))
    original_path = f"./images/original_{file.filename}"
    img.save(original_path)

    byte_io = io.BytesIO()

    # processed_path = f"./images/processed_{file.filename}"
    processed_img = img.convert("L")
    processed_img.save(byte_io, format='PNG')
    byte_io.seek(0)
    
    processed_path = f"./images/processed_{file.filename}"   
    processed_img.save(processed_path)

    return {"filename": file.filename,
            "processed_image": base64.b64encode(byte_io.getvalue()).decode('utf-8'),
            "message": "Image Processing success"}

@app.get("/", response_class=HTMLResponse)
async def main():
    content = """
    <form action="/upload/" enctype="multipart/form-data" method="post">
        <input name="file" type="file" />
        <input type="submit" value="Upload" />
    </form>
    """
    return HTMLResponse(content=content)


if __name__ == "__main__":
    import uvicorn 
    uvicorn.run(app, host="127.0.0.1", port=8000)
