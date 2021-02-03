mongo <<EOF
use $MONGO_INITDB_DATABASE
db.draopDatabase()
db.createUser({
    user:  '$MONGODB_USERNAME',
    pwd: '$MONGODB_PASSWORD',
    roles: [{
        role: 'readWrite',
        db: '$MONGO_INITDB_DATABASE'
    }]
})
db.createCollection('userLogs',
  {
    capped: true,
    autoIndex: true,
    size: 6142800,
    max: 1000
  }
)
db.createCollection('rooms',
  {
    capped: true,
    autoIndex: true,
    size: 6142800,
    max: 1000
  }
)
db.createCollection('users',
  {
    capped: true,
    autoIndex: true,
    size: 6142800,
    max: 1000
  }
)
db.rooms.insert([
  {
    hmRoomID: '123-456-7890',
    owtRoomID:'abcdefg1',
    roomName: 'room1',
    participantLimit: 50,
    startedAt: 1609908599000
  },
  {
    hmRoomID: '123-456-7891',
    owtRoomID:'abcdefg2',
    roomName: 'room2',
    participantLimit: 50,
    startedAt: 1609908599000
  },
  {
    hmRoomID: '123-456-7892',
    owtRoomID:'abcdefg3',
    roomName: 'room3',
    participantLimit: 50,
    startedAt: 1609908599000
  },
  {
    hmRoomID: '123-456-7893',
    owtRoomID:'abcdefg4',
    roomName: 'room4',
    participantLimit: 50,
    startedAt: 1609908599000
  },
  {
    hmRoomID: '123-456-7894',
    owtRoomID:'abcdefg5',
    roomName: 'room5',
    participantLimit: 50,
    startedAt: 1609908599000
  }
])
db.users.insert([
  {
    'owtID': 'cdefg1',
    'name': '티맥스',
    'joinedAt': 1609387656412,
    'roomID': '123-456-7890',
    'camStatus': false,
    'micStatus': false
  },
  {
    'owtID': 'cdefg2',
    'name': '티베로',
    'joinedAt': 1609387656422,
    'roomID': '123-456-7890',
    'camStatus': false,
    'micStatus': false
  },
  {
    'owtID': 'cdefg3',
    'name': '티미팅',
    'joinedAt': 1609387656435,
    'roomID': '123-456-7890',
    'camStatus': false,
    'micStatus': false
  },
  {
    'owtID': 'cdefg4',
    'name': '티스페',
    'joinedAt': 1609387656440,
    'roomID': '123-456-7890',
    'camStatus': false,
    'micStatus': false
  },
  {
    'owtID': 'cdefg5',
    'name': '티우스',
    'joinedAt': 1609387656460,
    'roomID': '123-456-7890',
    'camStatus': false,
    'micStatus': false
  },
  {
    'owtID': 'cdefg6',
    'name': '티볼리',
    'joinedAt': 1609387656480,
    'roomID': '123-456-7891',
    'camStatus': false,
    'micStatus': false
  },
  {
    'owtID': 'cdefg7',
    'name': '티밍이',
    'joinedAt': 1609387656490,
    'roomID': '123-456-7891',
    'camStatus': false,
    'micStatus': false
  },
  {
    'owtID': 'cdefg8',
    'name': '티라노',
    'joinedAt': 1609387656590,
    'roomID': '123-456-7892',
    'camStatus': false,
    'micStatus': false
  },
  {
    'owtID': 'cdefg9',
    'name': '티검불',
    'joinedAt': 1609387656690,
    'roomID': '123-456-7893',
    'camStatus': false,
    'micStatus': false
  },
  {
    'owtID': 'cdefg10',
    'name': '티그리',
    'joinedAt': 1609387656790,
    'roomID': '123-456-7894',
    'camStatus': false,
    'micStatus': false
  },
])
db.userLogs.insert([
  {
    'name': 'sunghyeon',
    'startTime': '2020-12-29T13:35:50Z',
    'endTime': '2020-12-29T13:50:50Z'
  },
  {
    'name': 'sunghyeon',
    'startTime': '2020-12-28T13:35:50Z',
    'endTime': '2020-12-28T16:50:50Z'
  },
  {
    name: 'sunghyeon',
    startTime: '2020-12-27T10:35:50Z',
    endTime: '2020-12-27T12:50:50Z'
  },
  {
    name: 'hyeonsung',
    startTime: '2020-12-26T10:35:50Z',
    endTime: '2020-12-26T13:50:50Z'
  },
  {
    name: 'hyeonsung',
    startTime: '2020-12-25T15:35:50Z',
    endTime: '2020-12-25T16:50:50Z'
  },
  {
    name: 'hyeonsung',
    startTime: '2020-12-24T09:35:50Z',
    endTime: '2020-12-24T12:50:50Z'
  },
  {
    name: 'sunghyeon',
    startTime: '2020-12-23T13:35:50Z',
    endTime: '2020-12-23T13:50:50Z'
  },
  {
    name: 'sunghyeon',
    startTime: '2020-12-22T13:50:50Z',
    endTime: '2020-12-22T16:50:50Z'
  },
  {
    name: 'sunghyeon',
    startTime: '2020-12-21T11:50:50Z',
    endTime: '2020-12-21T12:50:50Z'
  },
  {
    name: 'hyeonsung',
    startTime: '2020-12-20T12:35:50Z',
    endTime: '2020-12-20T13:50:50Z'
  }
  {
    name: 'hyeonsung',
    startTime: '2020-12-19T13:35:50Z',
    endTime: '2020-12-19T16:50:50Z'
  },
  {
    name: 'hyeonsung',
    startTime: '2020-12-18T10:35:50Z',
    endTime: '2020-12-18T12:50:50Z'
  },
  {
    name: 'sunghyeon',
    startTime: '2020-12-17T12:35:50Z',
    endTime: '2020-12-17T13:50:50Z'
  },
  {
    name: 'sunghyeon',
    startTime: '2020-12-16T14:35:50Z',
    endTime: '2020-12-16T16:50:50Z'
  },
  {
    name: 'sunghyeon',
    startTime: '2020-12-15T11:35:50Z',
    endTime: '2020-12-15T12:50:50Z'
  },
  {
    name: 'hyeonsung',
    startTime: '2020-12-14T11:35:50Z',
    endTime: '2020-12-14T13:50:50Z'
  },
  {
    name: 'hyeonsung',
    startTime: '2020-12-13T13:35:50Z',
    endTime: '2020-12-13T16:50:50Z'
  },
  {
    name: 'hyeonsung',
    startTime: '2020-12-12T10:35:50Z',
    endTime: '2020-12-12T12:50:50Z'
  },
  {
    name: 'sunghyeon',
    startTime: '2020-12-11T13:35:50Z',
    endTime: '2020-12-11T13:50:50Z'
  },
  {
    name: 'sunghyeon',
    startTime: '2020-12-10T13:35:50Z',
    endTime: '2020-12-10T16:50:50Z'
  },
  {
    name: 'sunghyeon',
    startTime: '2020-12-09T10:35:50Z',
    endTime: '2020-12-09T12:50:50Z'
  },
  {
    name: 'hyeonsung',
    startTime: '2020-12-08T10:35:50Z',
    endTime: '2020-12-08T13:50:50Z'
  },
  {
    name: 'hyeonsung',
    startTime: '2020-12-07T15:35:50Z',
    endTime: '2020-12-07T16:50:50Z'
  },
  {
    name: 'hyeonsung',
    startTime: '2020-12-06T11:35:50Z',
    endTime: '2020-12-06T12:50:50Z'
  }
])
EOF