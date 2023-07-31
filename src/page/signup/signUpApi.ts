interface valuseType {
  confirm_password: string;
  phone: string;
  position: string;
  profileThumbUrl: string;
  userEmail: string;
  userPassword: string;
  userName: string;
}

export const signUp = async (values: valuseType) => {
  const { confirm_password, ...otherData } = values;
  console.log(JSON.stringify(otherData));
  try {
    const res = await fetch('http://localhost:8080/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(otherData),
    });
    console.log(await res.json());
    if (res.ok) {
      const data = await res.json();
      return data;
    }

    throw new Error('회원가입에 실패했습니다.');
  } catch (error) {
    console.error('오류 발생:', error);
  }
};
