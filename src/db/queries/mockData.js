const climbs = [
  {
    totalLength: 10,
    grade: '5.8',
    pitches: [
      { grade: '5.6', numberPitches: 2 },
      { grade: '5.7', numberPitches: 1 },
      { grade: '5.8', numberPitches: 1 }
    ],
    completedDate: new Date('January 7, 2020'),
    send: false,
    attempt: 'Onsight'
  },
  {
    totalLength: 20,
    grade: '5.10a',
    pitches: [
      { grade: '5.10a', numberPitches: 2 }
    ],
    send: true,
    attempt: 'Top Rope',
    completedDate: new Date('December 7, 2019')
  },
  {
    totalLength: 30,
    grade: '5.11b',
    pitches: [
      { grade: '5.11b', numberPitches: 1 },
    ],
    send: true,
    attempt: 'Redpoint',
    completedDate: new Date('December 7, 2019')
  }
]

const projects = [
  {
    _id: 1,
    totalLength: 15,
    completedDate: new Date('January 2, 2020'),
    pitches: [
      { grade: '5.12a', numberPitches: 1 }
    ],
    grade: '5.12a'
  },
  {
    _id: 2,
    totalLength: 20,
    completedDate: null,
    pitches: [
      { grade: '5.12b', numberPitches: 1 }
    ],
    grade: '5.12b'
  },
  {
    _id: 3,
    totalLength: 25,
    completedDate: new Date('December 5, 2019'),
    pitches: [
      { grade: '5.11d', numberPitches: 1 }
    ],
    grade: '5.11d'
  },
  {
    _id: 4,
    totalLength: 10,
    completedDate: null,
    pitches: [
      { grade: '5.11c', numberPitches: 1 }
    ],
    grade: '5.11c'
  }
]

const attempts = [
  {
    projectId: 1,
    send: false,
    attemptType: 'Redpoint',
    date: new Date('January 1, 2020')
  },
  {
    projectId: 1,
    send: true,
    attemptType: 'Redpoint',
    date: new Date('January 2, 2020')
  },
  {
    projectId: 3,
    send: false,
    attemptType: 'Redpoint',
    date: new Date('December 1, 2019')
  },
  {
    projectId: 3,
    send: true,
    attemptType: 'Redpoint',
    date: new Date('December 5, 2019')
  },
  {
    projectId: 4,
    send: false,
    attemptType: 'Top Rope',
    date: new Date('January 4, 2020')
  }
]

const gradesArray = [
  {
    grade: '5.12d',
    other: {}
  },
  {
    grade: '5.9',
    other: {}
  },
  {
    grade: '5.12a',
    other: {}
  },
  {
    grade: '5.10a',
    other: {}
  },
  {
    grade: '5.10b',
    other: {}
  },
  {
    grade: '5.6',
    other: {}
  },
  {
    grade: '5.10a',
    other: {}
  }
]
const sortedArray = [
  {
    grade: '5.6',
    other: {}
  },
  {
    grade: '5.9',
    other: {}
  },
  {
    grade: '5.10a',
    other: {}
  },
  {
    grade: '5.10a',
    other: {}
  },
  {
    grade: '5.10b',
    other: {}
  },
  {
    grade: '5.12a',
    other: {}
  },
  {
    grade: '5.12d',
    other: {}
  }
]

const climbsAgg = [
  {
    _id: '5.6',
    count: 3,
    attempts: [{
      _id: 'Top Rope',
      count: 3,
      send: [
        {
          _id: true,
          count: 2
        },
        {
          _id: false,
          count: 1
        }
      ]
    }]
  },
  {
    _id: '5.12d',
    count: 1,
    attempts: [{
      _id: 'Onsight',
      count: 1,
      send: [{
        _id: false,
        count: 1
      }]
    }]
  },
  {
    _id: '5.10c',
    count: 1,
    attempts: [{
      _id: 'Redpoint',
      count: 1,
      send: [{
        _id: true,
        count: 1
      }]
    }]
  },
  {
    _id: '5.8',
    count: 6,
    attempts: [
      {
        _id: 'Redpoint',
        count: 3,
        send: [
          {
            _id: true,
            count: 2
          },
          {
            _id: false,
            count: 1
          }
        ]
      },
      {
        _id: 'Top Rope',
        count: 1,
        send: [{
          _id: true,
          count: 1
        }]
      },
      {
        _id: 'Onsight',
        count: 2,
        send: [
          {
            _id: true,
            count: 1
          },
          {
            _id: false,
            count: 1
          }
        ]
      }
    ]
  },
  {
    _id: '5.10a',
    count: 1,
    attempts: [
      {
        _id: 'Redpoint',
        count: 1,
        send: [{
          _id: false,
          count: 1
        }]
      }
    ]
  }
]

const attemptsAgg = [
  {
    _id: '5e09731fe87a243a48c7765e',
    count: 1,
    attempts: [
      {
        _id: 'Top Rope',
        count: 1,
        send: [{
          _id: true,
          count: 1
        }]
      }
    ],
    projectData: [
      {
        _id: '5e09731fe87a243a48c7765e',
        pitches: [
          {
            grade: '5.10a',
            numberPitches: 1
          }
        ],
        totalLength: 25,
        grade: '5.10a',
        userId: '5e08ead88d88f02c64c99980',
      }
    ]
  },
  {
    _id: '5e6eea6ddad02d30d8082099',
    count: 6,
    attempts: [
      {
        _id: 'Top Rope',
        count: 5,
        send: [
          {
            _id: true,
            count: 3
          },
          {
            _id: false,
            count: 2
          }
        ]
      },
      {
        _id: 'Redpoint',
        count: 1,
        send: [{
          _id: true,
          count: 1
        }]
      }
    ],
    projectData: [
      {
        _id: '5e6eea6ddad02d30d8082099',
        pitches: [
          {
            grade: '5.10a',
            numberPitches: 1
          },
          {
            grade: '5.8',
            numberPitches: 1
          }
        ],
        totalLength: 25,
        grade: '5.12b',
        userId: '5e08ead88d88f02c64c99980',
      }
    ]
  }
]

const gradesChart = [
  {
    grade: '5.6',
    count: 3,
    attempts: [{
      attemptType: 'Top Rope',
      count: 3,
      sendCount: 2
    }]
  },
  {
    grade: '5.8',
    count: 6,
    attempts: [
      {
        attemptType: 'Redpoint',
        count: 3,
        sendCount: 2
      },
      {
        attemptType: 'Top Rope',
        count: 1,
        sendCount: 1
      },
      {
        attemptType: 'Onsight',
        count: 2,
        sendCount: 1
      }

    ]
  },
  {
    grade: '5.10a',
    count: 2,
    attempts: [
      {
        attemptType: 'Redpoint',
        count: 1,
        sendCount: 0
      },
      {
        attemptType: 'Top Rope',
        count: 1,
        sendCount: 1
      },
    ]
  },
  {
    grade: '5.10c',
    count: 1,
    attempts: [
      {
        attemptType: 'Redpoint',
        count: 1,
        sendCount: 1
      }
    ]
  },
  {
    grade: '5.12b',
    count: 6,
    attempts: [
      {
        attemptType: 'Top Rope',
        count: 5,
        sendCount: 3
      },
      {
        attemptType: 'Redpoint',
        count: 1,
        sendCount: 1
      }
    ]
  },
  {
    grade: '5.12d',
    count: 1,
    attempts: [
      {
        attemptType: 'Onsight',
        count: 1,
        sendCount: 0
      }
    ]
  },
]


module.exports = {
  attempts,
  attemptsAgg,
  climbs,
  climbsAgg,
  gradesArray,
  gradesChart,
  projects,
  sortedArray
}