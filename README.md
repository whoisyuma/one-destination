# グループ行き先共有アプリ
> You can find the English version of this README below.
> この README の英語版は下の方にあります。

## プロジェクト概要

本プロジェクトは、グループでの旅行やイベント計画のために「行きたい場所」と「行った場所」をグループ内のメンバー間で共有・管理できるシンプルなWebアプリケーションです。
Next.jsの機能である**Server Components**や**Server Actions**を積極的に活用し、高速で効率的なデータ管理を実現しています。

## 使用技術

- **フレームワーク：** Next.js(App Router)
- **言語：** Typescript
- **データベース:** Firebase Firestore
- **スタイル：** Tailwind CSS

## 主な機能

- グループ作成：グループ名とメンバー名を自由に入力し、新しいグループの作成をします。
- グループ詳細表示：グループのIDに基づいて、グループ名とメンバー名、行った場所や行きたい場所をリスト化して表示します。
- 場所の追加：入力フォームから新しい生きたい場所を簡単に追加できます。
- ステータス切替：各リストアイテムのチェックボックスを操作することで、リストをリアルタイムに更新します。
- 場所の削除：一覧から特定の場所を選択し、場所の削除が可能です。

## 学んだこと・工夫したこと
- Server Actionsによる責務の分離を徹底しました。
- Firebase Firestoreの階層設計を工夫しました。
- 1つのページ内で、クライアントコンポーネントとサーバーコンポーネントに分け、データの処理はServer Actionsで行いました。
- より良いUI/UXを意識したデザインに気を付けた。

## 追加したい機能
- 編集機能：グループ名やメンバー名、場所の編集機能の追加。

## 公開サイト
こちらからデプロイ後のサイトをご覧いただけます：
[https://one-destination.vercel.app/](https://one-destination.vercel.app/)

## デザイン

### モバイル版
![モバイル版のデザイン例](/public/mockup1.png)

### デスクトップ版
![デスクトップ版のデザイン例](/public/mockup2.png)

## 連絡先
以下から気軽にご連絡ください：
- E-mail: [whoisyuma.0913@gmail.com](whoisyuma.0913@gmail.com)

## 備考
このアプリは学習用として作成しました。

# Group Destination Sharing App

## Project Overview

This project is a simple web application designed for sharing and managing "places to visit" and "places visited" within a group—ideal for planning trips or events with friends or colleagues.

It utilizes **Server Components** and **Server Actions**, features of Next.js, to enable fast and efficient data handling.

## Technologies Used

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Database:** Firebase Firestore
- **Styling:** Tailwind CSS

## Main Features

- **Create Group:** Users can freely enter a group name and member names to create a new group.
- **Group Details Display:** Shows group name, member names, places to visit, and visited places based on the group ID.
- **Add Locations:** Easily add new places to visit using an input form.
- **Toggle Status:** Real-time updates of list items using checkboxes to toggle between visited and to-visit statuses.
- **Delete Locations:** Users can select and delete specific locations from the list.

## Key Learnings & Highlights

- Emphasized separation of concerns through Server Actions.
- Designed a thoughtful hierarchical structure for Firebase Firestore.
- Separated client and server components within a single page, handling all data operations using Server Actions.
- Focused on creating a better UI/UX experience.

## Planned Features

- **Edit Functionality:** Add support for editing group names, member names, and locations.

## Live Site

You can view the deployed site here:  
[https://one-destination.vercel.app/](https://one-destination.vercel.app/)

## Design

### Mobile Version
![Mobile design mockup](/public/mockup1.png)

### Desktop Version
![Desktop design mockup](/public/mockup2.png)

## Contact

Feel free to reach out via:  
- E-mail: [whoisyuma.0913@gmail.com](mailto:whoisyuma.0913@gmail.com)

## Notes

This app was created for learning purposes.
