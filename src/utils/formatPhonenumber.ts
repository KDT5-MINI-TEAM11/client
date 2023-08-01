// 전화번호 하이픈 생성 함수
export default function formatPhoneNumber(phoneNumber: string) {
  return `${phoneNumber.substring(0, 3)}-${phoneNumber.substring(
    3,
    7,
  )}-${phoneNumber.substring(7)}`;
}
