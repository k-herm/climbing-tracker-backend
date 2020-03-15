const climbs = [
  {
    totalLength: 10,
    pitches: [
      { grade: '5.6', numberPitches: 2 },
      { grade: '5.7', numberPitches: 1 },
      { grade: '5.8', numberPitches: 1 }
    ],
    completedDate: new Date("January 7, 2020")
  },
  {
    totalLength: 20,
    pitches: [
      { grade: '5.10a', numberPitches: 2 }
    ],
    completedDate: new Date("December 7, 2019")
  },
  {
    totalLength: 30,
    pitches: [
      { grade: '5.11b', numberPitches: 1 },
    ],
    completedDate: new Date("December 7, 2019")
  }
]

const projects = [
  {
    _id: 1,
    totalLength: 15,
    completedDate: new Date("January 2, 2020"),
    pitches: [
      { grade: '5.12a', numberPitches: 1 }
    ]
  },
  {
    _id: 2,
    totalLength: 20,
    completedDate: null,
    pitches: [
      { grade: '5.12b', numberPitches: 1 }
    ]
  },
  {
    _id: 3,
    totalLength: 25,
    completedDate: new Date("December 5, 2019"),
    pitches: [
      { grade: '5.11d', numberPitches: 1 }
    ]
  },
  {
    _id: 4,
    totalLength: 10,
    completedDate: null,
    pitches: [
      { grade: '5.11c', numberPitches: 1 }
    ]
  }
]

const attempts = [
  {
    projectId: 1,
    date: new Date("January 1, 2020")
  },
  {
    projectId: 1,
    date: new Date("January 1, 2020")
  },
  {
    projectId: 3,
    date: new Date("December 1, 2019")
  },
  {
    projectId: 4,
    date: new Date("January 4, 2020")
  }
]

module.exports = {
  climbs, projects, attempts
}