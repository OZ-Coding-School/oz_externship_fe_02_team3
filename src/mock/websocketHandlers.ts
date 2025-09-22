// src/mock/websocketHandlers.ts
import { ws } from 'msw'

interface WebSocketMessage {
  message_id: number
  sender: {
    user_uuid: string
    nickname: string
    profile_img_url: string
  }
  content: string
  created_at: string
  type?: 'message' | 'user_joined' | 'user_left' | 'typing'
}

/** 클라이언트 → 서버로 보내는 메시지*/
interface ClientToServerMessage {
  type: 'join' | 'message' | 'leave'
  room_id: string
  user_uuid: string
  nickname: string
  content?: string
}

const rooms: Record<string, WebSocket[]> = {}

// 특정 URL 패턴의 WebSocket 연결을 가로채는 관문 역할
// 반환값: WebSocket Link 객체 (이벤트 리스너를 추가할 수 있는 객체)
export const chatLink = ws.link(/\/ws\/chat\/[^/?]+(?:\?.*)?$/)

// 채팅방 입장
function handleJoinRoom(client: any, data: ClientToServerMessage) {
  // 1. 클라이언트가 보낸 join 메시지(data)에서 필요한 데이터 추출
  // data.room_id: 입장하려는 방의 고유 ID (예: "study-group-123")
  // data.user_uuid: 사용자의 고유 식별자 (예: "current-user-uuid")
  // data.nickname: 사용자의 표시명 (예: "현재사용자")
  const { room_id, nickname } = data

  // 2. 콘솔에 방 입장 요청 로그 출력 (디버깅용)
  // 어떤 사용자가 어떤 방에 입장하려는지 확인할 수 있음
  console.log(`[MSW][WS] 방 입장 요청: ${nickname} → 방 ${room_id}`)

  console.log('[DEBUG] 현재 전체 rooms 상태:', Object.keys(rooms))
  console.log(
    `[DEBUG] 방 ${room_id} 현재 상태:`,
    rooms[room_id] ? `${rooms[room_id].length}명` : '존재하지 않음'
  )

  // 3. 🆕 방이 새로 생성되는지 확인하는 플래그 변수 선언
  // rooms[room_id]가 undefined 또는 falsy 값이면 새로운 방임을 의미
  // 논리 NOT 연산자(!)를 사용하여 불린값으로 변환
  // 예: rooms['study-group-123'] === undefined → !undefined → true
  // 예: rooms['study-group-123'] === [client1] → ![client1] → false
  // isNewRoom = true → 새로운 방
  // isNewRoom = false → 기존에 존재하는 방
  const isNewRoom = !rooms[room_id]

  // 4. 상황별 메시지를 담을 변수 선언
  // let 키워드 사용으로 이후 조건에 따라 다른 객체로 재할당 가능
  // 타입은 WebSocketMessage 인터페이스를 따름
  let joinMessage: WebSocketMessage

  // 5. 새로운 방이면
  if (isNewRoom) {
    // 6. 새 방 생성 시 메시지 생성
    joinMessage = {
      message_id: Date.now(),
      sender: {
        user_uuid: 'system',
        nickname: '시스템',
        profile_img_url: '',
      },
      content: '채팅방이 생성되었습니다.',
      created_at: new Date().toISOString(),
      type: 'user_joined',
    }
    // 7. 새로운 방 생성 - 빈 배열로 초기화
    // rooms["study-group-123"] = [] 형태로 새로운 속성 추가
    rooms[room_id] = []
    console.log(`[MSW][WS] 새로운 방 생성: ${room_id}`)
  } else {
    // 8. 기존 방 입장 시 메시지 생성
    joinMessage = {
      message_id: Date.now(),
      sender: {
        user_uuid: 'system',
        nickname: '시스템',
        profile_img_url: '',
      },
      content: `${nickname}님이 입장했습니다!`,
      created_at: new Date().toISOString(),
      type: 'user_joined',
    }
    // 방 생성은 불필요하므로 메시지만 생성
  }

  // 9. 해당 방의 사용자 배열에 현재 클라이언트 추가
  // 새 방이든 기존 방이든 공통으로 실행되는 로직
  // 실행 후: rooms["study-group-123"] = [client] 또는 rooms["study-group-123"] = [client1, client2, ...]
  rooms[room_id].push(client)

  // 10. 현재 방에 몇 명이 있는지 확인하여 로그 출력
  // 방금 push했으므로 최소 1 이상의 값을 가짐
  console.log(
    `[MSW][WS] 방 ${room_id}에 ${nickname} 등록 완료. 현재 ${rooms[room_id].length}명`
  )

  // 10. 같은 방에 있는 모든 사용자들에게 입장 알림 브로드캐스트
  // broadcastToRoom 함수를 호출하여 방의 모든 멤버에게 메시지 전송
  broadcastToRoom(room_id, joinMessage)
}

// 같은 방에 있는 다른 사용자들에게 "새로운 사람이 들어왔다"고 알림
// 유저가 채팅방을 열자마자 join 메시지 전송
function broadcastToRoom(room_id: string, message: WebSocketMessage) {
  // 1. rooms 객체에서 지정된 방의 사용자 배열 가져오기
  // room = [client1, client2, client3] 형태의 WebSocket 클라이언트 배열
  const room = rooms[room_id]

  // 2. 방이 존재하지 않거나 사용자가 없는지 확인
  // !room: 방이 undefined인 경우 (존재하지 않는 방)
  // room.length === 0: 방은 있지만 사용자가 0명인 경우
  if (!room || room.length === 0) {
    // 3. 브로드캐스트할 대상이 없으므로 경고 로그 출력 후 함수 종료
    // 메시지를 받을 사용자가 없어서 경고 메시지를 콘솔에 출력하고 함수 실행을 중단
    console.warn(`[MSW][WS] 방 ${room_id}가 비어있거나 존재하지 않음`)
    return // 함수 실행 중단
  }

  // 4. 메시지에 room_id 추가 (프론트엔드에서 필터링용)
  // { ...message, room_id: "study-group-123" } 형태로 확장
  // 프론트엔드에서 자신이 속한 방의 메시지만 처리할 수 있도록 함
  const messageWithRoom = {
    ...message, // 기존 메시지의 모든 속성 복사
    room_id: room_id, // room_id 속성 추가
  }

  // 5. 메시지 객체를 JSON 문자열로 변환
  // WebSocket은 문자열만 전송 가능하므로 JSON.stringify() 필요
  // 예: '{"message_id":123,"sender":{...},"content":"안녕하세요","room_id":"study-group-123"}'
  const messageStr = JSON.stringify(messageWithRoom)

  // 6. 브로드캐스트 실행 로그 출력 (디버깅용)
  // 어떤 방에 몇 명에게 어떤 메시지를 보내는지 확인
  console.log(
    `[MSW][WS] 방 ${room_id}에 브로드캐스트 (${room.length}명): ${message.content}`
  )

  // 7. MSW의 chatLink.broadcast()를 사용하여 모든 클라이언트에게 메시지 전송
  // 🚨 MSW 한계: 특정 클라이언트에게만 전송 불가, 모든 클라이언트에게 전송됨
  // 하지만 messageWithRoom에 room_id가 포함되어 있어서
  // 프론트엔드에서 자신의 방 메시지만 필터링해서 처리할 수 있음
  chatLink.broadcast(messageStr)
}

// 채팅 메시지 수신
// 클라이언트가 보낸 메시지를 같은 방에 있는 모든 사용자에게 브로드캐스트
function handleChatMessage(data: ClientToServerMessage) {
  // 1. 필요한 정보를 data에서 직접 추출
  // data = { type: 'message', room_id: 'study-group-123', user_uuid: 'current-user-uuid', nickname: '현재사용자', content: '안녕하세요' }
  const { room_id, user_uuid, nickname, content } = data

  // 2. 기본적인 유효성 검사 (room_id가 있는지만 확인)
  if (!room_id) {
    // 3. room_id가 없으면 메시지 처리 불가
    console.warn('[MSW][WS] room_id가 없는 메시지 무시')
    return // 함수 실행 중단
  }

  // 4. 채팅 메시지 수신 로그 출력 (디버깅용)
  // 누가 어떤 방에서 메시지를 보냈는지 확인
  console.log(`[MSW][WS] 채팅 메시지: ${nickname} in 방 ${room_id}`)

  // 5. 받은 메시지를 기반으로 Echo 응답 메시지 객체 생성
  // 클라이언트가 보낸 메시지를 다른 사용자들에게 전달하기 위한 메시지 구조 생성
  const chatMessage: WebSocketMessage = {
    message_id: Date.now() + Math.random(), // 고유한 메시지 ID 생성 (시간 + 랜덤값으로 중복 방지)
    sender: {
      user_uuid: user_uuid || 'unknown', //  data에서 직접 가져옴
      nickname: nickname || 'Unknown User', // data에서 직접 가져옴
      profile_img_url: '', // 프로필 이미지 (현재는 빈 문자열)
    },
    content: content || '메시지 내용 없음', // data에서 직접 가져옴
    created_at: new Date().toISOString(), // 메시지 생성 시간을 ISO 형식으로 저장
    type: 'message', // 메시지 타입: 일반 채팅 메시지
  }

  // 6. 같은 방에 있는 모든 사용자들에게 채팅 메시지 브로드캐스트
  // 메시지를 보낸 사용자를 포함하여 방의 모든 멤버에게 메시지 전송
  broadcastToRoom(room_id, chatMessage) // data에서 직접 가져온 room_id 사용
}

// 방 퇴장 처리 함수
function handleLeaveRoom(client: any, data: ClientToServerMessage) {
  // 1. 필요한 정보를 data에서 직접 추출
  const { room_id, nickname } = data

  // 2. 기본적인 유효성 검사 (room_id가 있는지만 확인)
  if (!room_id) {
    // 3. room_id가 없으면 퇴장 처리 불가
    console.warn('[MSW][WS] room_id가 없는 퇴장 요청 무시')
    return // 함수 실행 중단
  }

  // 4. 방 퇴장 로그 출력 (디버깅용)
  console.log(`[MSW][WS] 방 퇴장: ${nickname} from 방 ${room_id}`)

  // 5. 해당 방이 존재하는지 확인
  if (rooms[room_id]) {
    // 6. 방의 사용자 배열에서 현재 클라이언트 제거
    // otherClient !== client: 퇴장하는 클라이언트가 아닌 다른 클라이언트들만 남김
    // 예: [client1, client2, client3] → [client1, client3] (client2 제거됨)
    rooms[room_id] = rooms[room_id].filter(
      (otherClient) => otherClient !== client
    )
    console.log(
      `[MSW][WS] 방 ${room_id}에서 ${nickname} 제거 완료. 현재 ${rooms[room_id].length}명`
    )
  }

  // 7. 퇴장 알림 메시지 객체 생성
  // 다른 사용자들에게 "누군가 나갔다"고 알리기 위한 시스템 메시지
  const leaveMessage: WebSocketMessage = {
    message_id: Date.now(), // 현재 시간을 메시지 ID로 사용
    sender: {
      user_uuid: 'system', // 시스템 메시지임을 표시
      nickname: '시스템', // 시스템 메시지 표시명
      profile_img_url: '', // 프로필 이미지 없음
    },
    content: `${nickname}님이 나갔습니다 👋`, // 🔧 [수정됨] data에서 직접 가져온 nickname 사용
    created_at: new Date().toISOString(), // 현재 시간을 ISO 형식으로
    type: 'user_left', // 메시지 타입: 사용자 퇴장 알림
  }

  // 8. 같은 방에 남아있는 사용자들에게 퇴장 알림 브로드캐스트
  // 퇴장한 사용자는 이미 배열에서 제거되었으므로 받지 않음
  broadcastToRoom(room_id, leaveMessage)

  // 9. 방이 비어있는지 확인
  // rooms[room_id].length === 0: 배열이 비어있으면(사용자가 0명이면)
  if (rooms[room_id] && rooms[room_id].length === 0) {
    // 10. 빈 방은 메모리 절약을 위해 삭제
    // delete 연산자: 객체의 속성을 완전히 제거
    delete rooms[room_id]
    // 11. 방 삭제 로그 출력
    console.log(`[MSW][WS] 빈 방 삭제: ${room_id}`)
  }
}

// WebSocket Link 객체에 'connection' 이벤트 리스너 추가
// 브라우저에서 new WebSocket()으로 연결할 때마다 이 함수가 실행됨
// client는 MSW가 제공하는 가짜 클라이언트 객체 (실제 서버의 연결된 클라이언트와 동일한 역할)
export const websocketHandlers = [
  chatLink.addEventListener('connection', ({ client }) => {
    console.log('[MSW][WS] 연결됨')

    // 클라이언트가 보낸 메시지를 받기 위한 이벤트 리스너 추가
    // 브라우저에서 ws.send()로 메시지를 보낼 때마다 이 함수가 실행됨
    // 매개변수: (event) - 메시지 이벤트 객체, event.data에 실제 메시지 내용이 들어있음
    client.addEventListener('message', (event) => {
      // event.data가 string인지 먼저 확인
      const raw = String(event.data ?? '')
      // JSON 파싱을 먼저 시도
      const data = JSON.parse(raw)
      console.log('[MSW][WS] 수신:', raw)

      try {
        // 🆕 [추가] 메시지 타입별 처리
        if (data.type === 'join') {
          handleJoinRoom(client, data)
        } else if (data.type === 'message') {
          handleChatMessage(data)
        } else if (data.type === 'leave') {
          handleLeaveRoom(client, data)
        } else {
          console.warn('[MSW][WS] 알 수 없는 메시지 타입:', data.type)
        }
      } catch (parseError) {
        console.error('[MSW][WS] JSON 파싱 에러:', parseError)
        console.warn('[MSW][WS] JSON 아님:', raw)
      }
    })

    // 연결 종료 처리
    // 클라이언트가 연결을 끊었을 때 실행되는 이벤트 리스너
    // 브라우저에서 ws.close()를 호출하거나 페이지를 닫을 때 실행됨
    client.addEventListener('close', () => {
      console.log('❌ MSW WebSocket 연결 종료됨')
    })
  }),
]
