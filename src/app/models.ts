export class ScoreAreaV2 {
    id: string;
    province: string;
    zone: string;
    noArea: string;
    score: number;
    countAuthority: number;
    percentScore: number;
    partyWin: string;
    region: string;
}

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