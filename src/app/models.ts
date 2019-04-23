import { DateTime } from "ionic-angular";

export class DataChart {
    labels: string[];
    datasets: DataSet[];
}

export class DataSet {
    label: string;
    data: Data[];
    backgroundColor: string;
}

export class Data {
    x: number;
    y: number;
}

export class ScoreElection {
    id: string;
    province: string;
    zone: string;
    party: string;
    firstName: string;
    lastName: string;
    batch: string;
    date: DateTime;
    score: number;
}

export class ScoreArea {
    id: string;
    province: string;
    zone: string;
    batch: string;
    date: DateTime;
    score: number;
}

export class ScoreParty {
    id: string;
    party: string;
    batch: string;
    date: DateTime;
    score: number;
}

export class ShowScore {
    id: string;
    party: string;
    scoreBatch1: number;
    scoreBatch2: number;
    scoreBatch3: number;
    scoreBatch4: number;
    scoreBatch5: number;
    scoreBatch6: number;
    scoreBatch7: number;
    scoreBatch8: number;
    scoreBatch9: number;
}

export class ShowScoreArea {
    id: string;
    province: string;
    zone: string;
    scoreBatch1: number;
    scoreBatch2: number;
    scoreBatch3: number;
    scoreBatch4: number;
    scoreBatch5: number;
    scoreBatch6: number;
    scoreBatch7: number;
    scoreBatch8: number;
    scoreBatch9: number;
}

export class CompareScore {
    id: string;
    party: string;
    scoreBatch1st: number;
    scoreBatch2nd: number;
    diff: number;
    percentDiff: number;
}

export class CompareScoreArea {
    id: string;
    province: string;
    zone: string;
    scoreBatch1st: number;
    scoreBatch2nd: number;
    diff: number;
    percentDiff: number;
}