---
title: 팝콘 프로젝트 3주차 회고
date: '2023-06-20 00:00:00'
author: 이용민
tags: 프로젝트 회고
categories: etc
---

![insight_boy.png](insight_boy.png)

## ✔ 3주차 회고

3주차에는 간단한 마이페이지를 구현했다.  
이미지 입출력을 구현 해보기 위해 진행했고 Multer 라이브러리를 이용하여 비교적 간단하게 구현하였다.

### 1. Did

**① Multer**  
Multer 라이브러리는 파일 업로드를 위해 사용되는 Node.js의 미들웨어이다.  
multipart/form-data 형식으로 파일 업로드를 지원하기 때문에 header에 Content-Type을 multipart/form-data로 지정하여 FormData를 송신하는 것으로 처리했다.  
단일 파일을 업로드 하는 기능이기 때문에 upload.single(${key}) 를 이용하여 미들웨어를 사용했다.  

```javascript
if (!fs.existsSync(repo)) {
  fs.mkdirSync(repo, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, repo);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now());
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

```

Multer를 처음 다루기 때문에 사용법이 미흡했던 점과 repository가 없을 시에는 디렉토리 생성, 파일명 인코딩 등  
미처 생각하지 못했던 부분들을 하나씩 처리하느라 조금 어려움을 겪었지만, 라이브러리 사용법이 간단하여 수월하게 구현한 것 같다.  

---

### 2. Issues

의외로 프론트엔드에서 어려움을 더 겪었다.  
FileReader 객체의 readAsDataURL를 통하여 이미지 데이터를 읽고 데이터를 가공하는 과정에서의 파일명 인코딩 문제에서 어려움을 겪었다.  

**① 인코딩**  
Multer의 로직을 통해 생성된 이미지 파일의 이름이 인코딩이 깨져있는 현상이 발생했다.

```javascript
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setAvatarImg(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setImgUrl(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
```

인코딩을 여러곳에서 해주고 있다는 것이 원인이었고 클라이언트의 FileReader.readAsDataURL 에서 base64로 이미 인코딩된 스트링 데이터를 반환한다는 것을 알았다.  
그래서 위와 같이 소스를 수정했고 다른 곳에서도 해주던 인코딩 소스들을 전부 제거하여 해결하였다.  

---
