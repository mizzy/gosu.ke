// src/data/education.ts
// 学歴 (新しい順)。

export type EducationEntry = {
  year: string  // 卒業/中退/修了の年
  school: string
  detail: string
  note?: string  // 中退・転学などの注記
}

export const education: EducationEntry[] = [
  {
    year: '2024',
    school: '京都大学大学院',
    detail: '情報学研究科 博士後期課程',
    note: '単位認定退学',
  },
  {
    year: '2019',
    school: '帝京大学',
    detail: '理工学部 情報科学科 (通信教育課程)',
  },
  {
    year: '1997',
    school: '北海道大学',
    detail: '経済学部 経営学科',
  },
]
