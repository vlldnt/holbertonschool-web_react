interface MajorCredits {
  credits: number;
  brand: "MajorCredits";
}

interface MinorCredits {
  credits: number;
  brand: "MinorCredits";
}

function sumMajorCredits(subject1: MajorCredits, subject2: MajorCredits): MajorCredits {
  return {
    credits: subject1.credits + subject2.credits,
    brand: "MajorCredits",
  };
}

function sumMinorCredits(subject1: MinorCredits, subject2: MinorCredits): MinorCredits {
  return {
    credits: subject1.credits + subject2.credits,
    brand: "MinorCredits",
  };
}

const majorSubject1: MajorCredits = { credits: 3, brand: "MajorCredits" };
const majorSubject2: MajorCredits = { credits: 4, brand: "MajorCredits" };
const minorSubject1: MinorCredits = { credits: 1, brand: "MinorCredits" };
const minorSubject2: MinorCredits = { credits: 2, brand: "MinorCredits" };

document.body.innerHTML += `<p>Total Major Credits: ${sumMajorCredits(majorSubject1, majorSubject2).credits} (${sumMajorCredits(majorSubject1, majorSubject2).brand})</p>`;
document.body.innerHTML += `<p>Total Minor Credits: ${sumMinorCredits(minorSubject1, minorSubject2).credits} (${sumMinorCredits(minorSubject1, minorSubject2).brand})</p>`;
