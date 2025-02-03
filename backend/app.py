from fastapi import FastAPI, File, UploadFile
from fastapi.responses import HTMLResponse
from PIL import Image
import io 

app = FastAPI()

@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    contents = await file.read()
    img = Image.open(io.BytesIO(contents))
    img.save(f"./images/original_{file.filename}")

    img = img.convert("L")
    img.save(f"./images/processed_{file.filename}.png")

    return {"filename": file.filename, 
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
