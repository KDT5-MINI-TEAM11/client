# KDT5-MINI with backend

## 프로젝트 소개

본 웹 어플리케이션은 50명 내외의 중소기업에서 사용하는 연차/당직 관리 프로그램입니다.

패스트캠퍼스 백엔드 5기 3분과 팀을 이루어 협업을 진행하였습니다.

[결과물 보러가기](https://kdt-5-mini-team-11-eifz.vercel.app/)

## 11조 개쩌는팀 소개

| 팀원 |      박진영      |         남기훈         |           이정우           | 성규창 | 김용원 | 배종윤 |
| :--: | :--------------: | :--------------------: | :------------------------: | ------ | ------ | ------ |
| 담당 | 내계정<br>관리자 | 회원가입<br>캘린더<br> | 인증인가<br>연차/당직 신청 | 백엔드 | 백엔드 | 백엔드 |

<br><br>

## 사용한 기술, 라이브러리

### Environment

<img src="https://img.shields.io/badge/VISUAL STUDIO CODE-007ACC?style=flat&logo=visualstudiocode&logoColor=white"/><br>
<img src="https://img.shields.io/badge/GIT-F05032?style=flat&logo=git&logoColor=white"/><br>
<img src="https://img.shields.io/badge/GIT HUB-181717?style=flat&logo=github&logoColor=white"/><br>

### Config

<img src="https://img.shields.io/badge/NPM-CB3837?style=flat&logo=npm&logoColor=white"/><br>
<img src="https://img.shields.io/badge/VITE-646CFF?style=flat&logo=vite&logoColor=white"/><br>

### Frontend

<img src="https://img.shields.io/badge/REACT-61DAFB?style=flat&logo=React&logoColor=white"/><br>
<img src="https://img.shields.io/badge/TYPESCRIPT-3178C6?style=flat&logo=typescript&logoColor=white"/><br>
<img src="https://img.shields.io/badge/REACT ROUTER-CA4245?style=flat&logo=reactrouter&logoColor=white"/> <br>
<img src="https://img.shields.io/badge/ANT DESIGHN-0170FE?style=flat&logo=antdesign&logoColor=white"/> <br>

### Backend

<img src="https://img.shields.io/badge/JAVA SPRING-6DB33F?style=flat&logo=spring&logoColor=white"/><br>
<img src="https://img.shields.io/badge/MYSQL-4479A1?style=flat&logo=mysql&logoColor=white"/><br>

### Co-work

<img src="https://img.shields.io/badge/NOTION-000000?style=flat&logo=notion&logoColor=white"/><br>
<img src="https://img.shields.io/badge/FIGMA-F24E1E?style=flat&logo=figma&logoColor=white"/><br>
<img src="https://img.shields.io/badge/SLACK-4A154B?style=flat&logo=slack&logoColor=white"/><br>

## 화면 구성

### 로그인

<img width="1277" alt="image-1" src="https://github.com/KDT1-FE/KDT5-Mini/assets/87072568/eea03f4c-f582-4a6f-acee-b084f699c145">

- 사내에서 사용하는 프로그램으로 반드시 로그인이 필요함
  - 로그인, 회원가입 페이지를 제외한 모든 페이지는 protected route
- 로그인 창을 모달화하였으며 외부 배경을 blur 처리
- 회원가입 버튼을 눌러 회원가입페이지로 이동

<hr>

### 회원가입

![2023-08-11_14-32-12-1](https://github.com/KDT1-FE/KDT5-Mini/assets/87072568/1c14974d-3a5e-4dca-9270-5928830161a2)

- 입력 항목별 유효성 검사
- 이메일 중복 체크 이후에 이메일 인증해야 회원가입을 할 수 있다.

<hr>

#### 메인 화면

<img width="1266" alt="image-3" src="https://github.com/KDT1-FE/KDT5-Mini/assets/87072568/467fbd63-4696-49e9-99d1-642a8a7ceec6">

- 사이드바에서 내가 신청한 연차/당직 목록을 확인 할 수 있다.
- 사이드바에서 새로운 연차/당직을 신청할 수 있다.
  - 신청한 연차/당직은 대기 상태로 등록이 되며 관리자가 승인 또는 거절을 한다.
  - 심사중인 연차/당직은 취소가 가능하다.
- 우측 상단에 간략한 내 정보 및 로그아웃 버튼이 있다.
- 달력에는 모든 사원들의 승인된 일정이 표시된다.
- 달력 좌측 상단의 Switch 버튼을 눌러 내 일정만을 볼 수 있다.

<hr>

#### 내 정보 페이지

<img width="1276" alt="image-4" src="https://github.com/KDT1-FE/KDT5-Mini/assets/87072568/0bda4baf-0a2e-4bd8-a55a-389d143cc92c">

- 내 정보와 수정이 가능한 항목을 수정 할 수 있다.
- 유효성 검사 결과와 등록 결과 등을 팝업 메세지로 사용자에게 알려준다.
<hr>

#### 내 연차/당직 페이지

<img width="1270" alt="image-6" src="https://github.com/KDT1-FE/KDT5-Mini/assets/87072568/62795346-8a87-4edd-a55e-7bcd5350c0ff">

- 내가 신청한 연차/당직 정보를 확인할 수 있다.
- 심사 중인 연차/당직은 삭제가 가능하다.
- 거절된 연차/당직은 삭제가 불가능하다.
- 승인된 연차/당직은 삭제가 가능하다.
- 과거의 연차/당직은 삭제가 불가능하다.

<hr>

#### 관리자 연차/당직 승인 페이지

<img width="1268" alt="image-7" src="https://github.com/KDT1-FE/KDT5-Mini/assets/87072568/f7253c65-7151-49d9-ab25-bfd92a7f1844">

- 관리자는 모든 사원의 연차/당직 신청을 승인, 거절, 취소할 수 있다.
- 관리자`MANAGER`가 메뉴가 보이지 않으며 접근 할 수 없다.

<hr>

#### 관리자 사원 직책 변경 페이지

![2023-08-11_14-52-36](https://github.com/KDT1-FE/KDT5-Mini/assets/87072568/aec52ed5-d6ee-4138-a958-af6d5495ae02)

- 관리자는 사원의 직책을 변경할 수 있다.

<hr>

## 고찰

### 협업

- 처음으로 백엔드와 협업을 진행<br><br>
- 백엔드는 프론트 지식이 프론트는 백엔드 지식이 부족한 관계로 초반 소통과정이 원활하지 않음<br><br>
  - <b>가장 중요한 것은 소통</b>, 지식 간극을 적극적인 소통으로 줄여나감
  - data base, 네트워크 통신, 보안에 대한 추가적인 공부가 필요함<br><br>
- 노션, 슬랙, 줌, 피그마 툴을 사용
  - 노션 : API 명세서
    <img width="449" alt="image-13" src="https://github.com/KDT1-FE/KDT5-Mini/assets/87072568/6b8e8f2d-1916-4c7f-9eca-b955486b2c6c">
    <br><br>
  - 슬랙 : 텍스트 형식의 소통
    <img width="287" alt="image-10" src="https://github.com/KDT1-FE/KDT5-Mini/assets/87072568/bdae1ba9-8ecc-4074-96d9-f09eaab8019a"><br><br>
  - 줌 : 영상, 음성 형식의 실시간 소통
    <img width="1273" alt="image-12" src="https://github.com/KDT1-FE/KDT5-Mini/assets/87072568/2d1da2ea-6b5c-492d-af54-0c2f6b473748"><br><br>
  - 피그마 : 와이어프레임 작성
    <img width="646" alt="image-14" src="https://github.com/KDT1-FE/KDT5-Mini/assets/87072568/9a2c5d45-f4cf-41fe-b61e-805486639db4"><br><br>

### AccessToken & RefreshToken, HttpOnly 쿠키, Axios Interceptor

![img_1](https://github.com/KDT1-FE/KDT5-Mini/assets/87072568/2300bb17-b7a3-477d-8e12-7518f7a6b563)

- Authorization

  - 사용자가 로그인을 요청을 보내면 서버에서 accessToken은 res.body에 담아서 보내고, refreshToken은 Http Only 쿠키로 보낸다.<br><br>

- Athentication

  - 로그인 한 사용자가 요청을 보낼 때 header에 accessToken을 담아 보낸다.
  - Axios interceptor를 이용하면 accessToken이 필요한 모든 요청들에 토큰을 담아 보낼 수 있다.<br><br>

  ```js
  export const customAxios = axios.create({
    baseURL: BASE_API_URL,
    timeout: 5000,
  });

  customAxios.interceptors.request.use(
    async (req) => {
      const accessToken = getAccessTokenFromCookie();
      if (!accessToken) {
        return req;
      }
      req.headers.Authorization = `Bearer ${accessToken}`;
      return req;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  ```

  - 서버는 해당 accessToken을 검증하고 응답을 보낸다.<br><br>

- AccessToken이 만료 된 경우

  - accessToken이 만료 된 경우 서버에서는 401 상태메세지를 보내고 이를 Axios interceptor를 통해 중간에서 새로운 accessToken을 요청하는 로직을 구현할 수 있다.

  ```ts
  // 여러개의 요청이 밀렸을 경우 리프레시토큰 api가 여러번 실행되는 것을 막는 flag
  let isRefreshing = false;

  // 만료된 토큰으로 인해 pending상태가 된 기존의 요청들을 배열에 담음, 새로운 토큰이 발행되면 이들 요청을 진행
  let refreshSubscribers: ((accessToken: string) => void)[] = [];

  customAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const status = error.response?.data.error.status;

      if (status === 401) {
        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const response = await axios(
              `${BASE_API_URL}/v1/auth/refresh-token`,
              {
                withCredentials: true,
              },
            );

            if (response.status === 200) {
              setAccessTokenToCookie(response.data.response.accessToken);

              const config = error.config;
              config.headers.Authorization = `Bearer ${response.data.response.accessToken}`;
              config.withCredentials = true;

              const retryOriginalRequest = new Promise((resolve) => {
                resolve(axios(config));
              });

              isRefreshing = false;

              refreshSubscribers.forEach((callback) =>
                callback(response.data.response.accessToken),
              );
              refreshSubscribers = [];

              return retryOriginalRequest;
            }
          } catch (error) {
            deleteAccessTokenFromCookie();
            isRefreshing = false;
            return Promise.reject(error);
          }
        } else {
          return new Promise((resolve) => {
            refreshSubscribers.push((accessToken: string) => {
              error.config.headers.Authorization = `Bearer ${accessToken}`;
              resolve(axios(error.config));
            });
          });
        }
      } else {
        return Promise.reject(error);
      }
    },
  );
  ```

- HttpOnly 쿠키

  - 401응답을 받은 클라이언트는 accessToken 재발급을 위해 "/v1/auth/refresh-token" GET요청을 보낸다. 이 때 refreshToken은 이미 쿠키에 담겨있다.
  - HttpOnly 쿠키는 클라이언트측에서 자바스크립트로 접근 할 수 없으므로 XXS와 같은 공격을 무력화 시킨다.
  - `withCredentials`를 `true`로 설정해야 한다.
  - 클라이언트 배포 주소와 서버 배포 주소가 모두 SSL인증서를 필요로 한다.
    - 서버에서는 무료 dns와 SSL인증서를 발급방아서 해결
    - 클라이언트는 vecel로 배포시 https로 배포가 되므로 서버와 같은 작업이 필요없다.
    - 그러나 로컬 환경에서 테스트를 할 때는 HttpOnly 쿠키 사용이 불가능하므로 배포 환경과 로컬 환경에서의 api를 분리하여서 작업하였다.
    - 해당 리포지토리는 로컬용
