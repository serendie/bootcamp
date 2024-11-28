# SDS Bootcamp App

## このリポジトリについて

ブートキャンプ時のデモ用に、素朴な React アプリケーション環境を用意し、SDS Packages を使う事前準備を行ったものです。SDS Packages を使う際のサンプルアプリケーションとして参考にしてください。

なお、このアプリは [Vite](https://ja.vite.dev/) を用いた React + TypeScript 環境です。下記コマンドで開発サーバーが起動します。

```bash
$ npm install
$ npm run dev
```

## 準備

1. GitHub チームに参加する
2. [こちらのドキュメント](https://docs.github.com/ja/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#personal-access-token-classic-%E3%81%AE%E4%BD%9C%E6%88%90)を参照し、[Personal Access Token (Classic)](https://github.com/settings/tokens/new)から、Access Token を作成する
3. Token 作成時の Scope は、「read:packages」を選択する
4. 作成したトークンを、[.npmrc](https://github.com/serendie/bootcamp/blob/main/.npmrc#L1)に記載する (`YOUR_GITHUB_TOKEN`を置換)
