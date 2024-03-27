// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];
// This function uses the learner data make sure an AssignmentGroup has matching course_id
function courseChecker(course, ag) {
  if (course.id === ag.course_id) {
    console.log("Course ID matches.");
    return true;
  } else {
    console.log("Nope.");
    return false;
  }
}

//Functions saves learnerIds for me
function storeIds(submissions, emptyArray) {
  for (i = 0; i < submissions.length; i++) {
    emptyArray.push(submissions[i].learner_id);
    // if(i === 1)
    //     if(emptyArray[0] === submissions[i].learner_id)
    //       continue;
    // else if(emptyArray[0] !== submissions[i].learner_id)
    // {
    //   emptyArray.push(submissions[i].learner_id);
    // }
  }
}
function calcGrades(subs, ag) {
  let denom = {
    assignment_id: [],
    possible_points: [], // Did this it's easy to coordinate scores and points later.
  };
  for (const i in ag.assignments) {
    denom.possible_points.push(ag.assignments[i].points_possible);
    denom.assignment_id.push(ag.assignments[i].id);
  }
  let scores = {
    learner_id: [],
    assignment_id: [],
    score: [],
    //student_id: []
  };
  for (const i in subs) {
    scores.learner_id.push(subs[i].learner_id);
    scores.assignment_id.push(subs[i].assignment_id);
    scores.score.push(subs[i].submission.score);
    //scores.student_id.push(subs[i].learner_id);
  }
  let grades = {
    person1: [],
    person2: [] //didnt feell like figuring out how to make this DYNAMiC.
  };
  
 // console.log("Printing right before the for loop thats not working");
  for (const i in subs) {
    if (scores.assignment_id[i] === denom.assignment_id[i]) {
      //console.log("Im in the first if statement.")
      console.log(scores.learner_id[i]);
      if (scores.learner_id[i] === 125) {
        //console.log("Im in the nested if statement.");
        grades.person1.push(scores.score[i] / denom.possible_points[i]);
        //console.log("check out person 1s grades:" + grades.person1);
      } 
    }else {
        //console.log("Im in the else statement.")
        grades.person2.push(scores.score[i] / denom.possible_points[i]); // This isn't working for some reason trying to figure out why.
        //console.log("check out person 2s grades:" + grades.person2);
      }
  }
  console.log(scores);
  console.log(denom);
  console.log(grades);
  return grades; //Why isn't this full
}
function calcAverage(subs, assignGroup) {
  let total = 0;
  let count = 0;
  let average = 0;
  let learnerId = [];
  storeIds(subs, learnerId);
  for (i = 0; i < subs.length; i++) {
    if (subs[i].assignment_id === assignGroup.id) {
      total += subs[i].submission.score;
      count++;
    }
  }
  average = total / count;
  console.log(average);
}
function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  let stuID = [];
  //courseChecker(course,ag);
  try {
    if (courseChecker(course, ag) === true) {
      console.log("Your data is fine.");
      //stuID.push(submissions.learner_id); Don't need to do this here.
    } else throw new Error("Course ID does not match.");
  } catch (error) {
    //Saw that our lesson 308H.2 used err as a variable name. Confused by that.
    console.error("An error occured:", error.message); //Woud err have been better here?
  }
  storeIds(submissions, stuID);
  console.log(stuID);
  // console.log(ag.assignments[1].points_possible); //Not sure why this isn't working or how it's undefined.
  console.log(calcGrades(submissions, ag));
  const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0, // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833, // late: (140 - 15) / 150
    },
  ];

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);
// Your goal is to analyze and transform this data such that the output of your program is an array of objects, each containing the following information in the following format:
// {
//     // the ID of the learner for which this data has been collected
//     "id": number,
//     // the learner’s total, weighted average, in which assignments
//     // with more points_possible should be counted for more
//     // e.g. a learner with 50/100 on one assignment and 190/200 on another
//     // would have a weighted average score of 240/300 = 80%.
//     "avg": number,
//     // each assignment should have a key with its ID,
//     // and the value associated with it should be the percentage that
//     // the learner scored on the assignment (submission.score / points_possible)
//     <assignment_id>: number,
//     // if an assignment is not yet due, it should not be included in either
//     // the average or the keyed dictionary of scores
// }
