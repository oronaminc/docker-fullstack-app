mongo <<EOF
use $MONGO_INITDB_DATABASE
db.dropDatabase()
use $MONGO_INITDB_DATABASE
db.createUser({
    user:  '$MONGODB_USERNAME',
    pwd: '$MONGODB_PASSWORD',
    roles: [{
        role: 'readWrite',
        db: '$MONGO_INITDB_DATABASE'
    }]
})
db.users.insert([
  {
    owtID: "cdefg1",
    name: "티맥스",
    joinedAt: 1609387656412,
    roomID: "123-456-7890",
    camStatus: false,
    micStatus: false
  },
  {
    owtID: "cdefg2",
    name: "티베로",
    joinedAt: 1609387656422,
    roomID: "123-456-7890",
    camStatus: false,
    micStatus: false
  },
  {
    owtID: "cdefg3",
    name: "티미팅",
    joinedAt: 1609387656435,
    roomID: "123-456-7890",
    camStatus: false,
    micStatus: false
  },
  {
    owtID: "cdefg4",
    name: "티스페",
    joinedAt: 1609387656440,
    roomID: "123-456-7890",
    camStatus: false,
    micStatus: false
  },
  {
    owtID: "cdefg5",
    name: "티우스",
    joinedAt: 1609387656460,
    roomID: "123-456-7890",
    camStatus: false,
    micStatus: false
  },
  {
    owtID: "cdefg6",
    name: "티볼리",
    joinedAt: 1609387656480,
    roomID: "123-456-7891",
    camStatus: false,
    micStatus: false
  },
  {
    owtID: "cdefg7",
    name: "티밍이",
    joinedAt: 1609387656490,
    roomID: "123-456-7891",
    camStatus: false,
    micStatus: false
  },
  {
    owtID: "cdefg8",
    name: "티라노",
    joinedAt: 1609387656590,
    roomID: "123-456-7892",
    camStatus: false,
    micStatus: false
  },
  {
    owtID: "cdefg9",
    name: "티검불",
    joinedAt: 1609387656690,
    roomID: "123-456-7893",
    camStatus: false,
    micStatus: false
  },
  {
    owtID: "cdefg10",
    name: "티그리",
    joinedAt: 1609387656790,
    roomID: "123-456-7894",
    camStatus: false,
    micStatus: false
  },
])
db.rooms.insertMany([
  {
    hmRoomID: "123-456-7890",
    owtRoomID: "abcdefg1",
    roomName: "room1",
    participantLimit: 50,
    startedAt: 1609908599000
  },
  {
    hmRoomID: "123-456-7891",
    owtRoomID: "abcdefg2",
    roomName: "room2",
    participantLimit: 50,
    startedAt: 1609908599000
  },
  {
    hmRoomID: "123-456-7892",
    owtRoomID: "abcdefg3",
    roomName: "room3",
    participantLimit: 50,
    startedAt: 1609908599000
  },
  {
    hmRoomID: "123-456-7893",
    owtRoomID: "abcdefg4",
    roomName: "room4",
    participantLimit: 50,
    startedAt: 1609908599000
  },
  {
    hmRoomID: "123-456-7894",
    owtRoomID: "abcdefg5",
    roomName: "room5",
    participantLimit: 50
  }
])
db.userlogs.insertMany([
  {
    name: "sunghyeon",
    startTime: 1609388656490,
    endTime: 1609388757490
  },
  {
    name: "sunghyeon",
    startTime: 1609487658490,
    endTime: 1609487760490
  },
  {
    name: "sunghyeon",
    startTime: 1609587670490,
    endTime: 1609587795490
  },
  {
    name: "sunghyeon",
    startTime: 1609687770490,
    endTime: 1609687895490
  },
  {
    name: "sunghyeon",
    startTime: 1609787770490,
    endTime: 1609787995490
  },
  {
    name: "sunghyeon",
    startTime: 1609897670490,
    endTime: 1609897995490
  },
  {
    name: "sunghyeon",
    startTime: 1609987770490,
    endTime: 1609987895490
  },
  {
    name: "sunghyeon",
    startTime: 1610087770490,
    endTime: 1610087995490
  },
  {
    name: "sunghyeon",
    startTime: 1610197670490,
    endTime: 1610197995490
  },
  {
    name: "sunghyeon",
    startTime: 1610297770490,
    endTime: 1610297895490
  },
  {
    name: "sunghyeon",
    startTime: 1610387770490,
    endTime: 1610387895490
  },
  {
    name: "sunghyeon",
    startTime: 1610497670490,
    endTime: 1610497895490
  },
  {
    name: "hyunsung",
    startTime: 1610587770490,
    endTime: 1610587895490
  },
  {
    name: "hyunsung",
    startTime: 1610697670490,
    endTime: 1610697795490
  },
  {
    name: "hyunsung",
    startTime: 1610787770490,
    endTime: 1610787895490
  },
  {
    name: "hyunsung",
    startTime: 1610897670490,
    endTime: 1610897795490
  },
  {
    name: "hyunsung",
    startTime: 1610987770490,
    endTime: 1610987895490
  },
  {
    name: "hyunsung",
    startTime: 1611097670490,
    endTime: 1611097890490
  },
  {
    name: "hyunsung",
    startTime: 1611187770490,
    endTime: 1611187895490
  },
  {
    name: "hyunsung",
    startTime: 1611297670490,
    endTime: 1611297799490
  },
  {
    name: "hyunsung",
    startTime: 1611387770490,
    endTime: 1611387896490
  },
  {
    name: "hyunsung",
    startTime: 1611497660490,
    endTime: 1611497795490
  },
  {
    name: "hyunsung",
    startTime: 1611587770490,
    endTime: 1611587895490
  },
  {
    name: "hyunsung",
    startTime: 1611697670490,
    endTime: 1611697890490
  }
])
EOF