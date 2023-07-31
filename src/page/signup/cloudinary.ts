const cloudinaryName = import.meta.env.VITE_CLOUD_NAME;

export const handleUpload = async (file: string | Blob) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'dvmzwc5k');

  try {
    if (!file) {
      return null;
    }

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload/`,
      {
        method: 'POST',
        body: formData,
      },
    );

    if (res.ok) {
      const data = await res.json();
      const imageUrl = data.url; // 이미지 URL을 받아옴
      return imageUrl; // 이미지 URL을 반환
    }

    throw new Error('이미지 업로드에 실패하였습니다.');
  } catch (error) {
    console.error('오류 발생:', error);
  }
};
