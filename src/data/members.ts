export type Member = {
  id: number;
  name: string;
  role: string;
  bio?: string;
  avatar?: string; // 画像はあとで
};

export const members: Member[] = [
  { id: 1, name: "Yuki", role: "Organizer", bio: "イベント運営と告知担当" },
  { id: 2, name: "Sora", role: "Designer", bio: "ロゴとビジュアル制作" },
  { id: 3, name: "Haru", role: "Engineer", bio: "サイト開発と運用" },
];
