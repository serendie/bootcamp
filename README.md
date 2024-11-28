# SDS Bootcamp App

## このリポジトリについて

ブートキャンプ時のデモ用に、素朴な React アプリケーション環境を用意し、SDS Packages を使う事前準備を行ったものです。SDS Packages を使う際のサンプルアプリケーションとして参考にしてください。

なお、このアプリは [Vite](https://ja.vite.dev/) を用いた React + TypeScript 環境です。下記コマンドで開発サーバーが起動します。

```bash
npm install
npm run dev
```

## 準備

プライベートベータ期間中 (2025年2月迄) は、プライベート状態で運用しているため、利用には下記の手順が必要になります。

1. GitHub チームに参加する
2. [こちらのドキュメント](https://docs.github.com/ja/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#personal-access-token-classic-%E3%81%AE%E4%BD%9C%E6%88%90)を参照し、[Personal Access Token (Classic)](https://github.com/settings/tokens/new)から、Access Token を作成する
3. Token 作成時の Scope は、「read:packages」を選択する
4. 作成したトークンを、[.npmrc](https://github.com/serendie/bootcamp/blob/main/.npmrc#L1)に記載する (`YOUR_GITHUB_TOKEN`を置換)

## Deisgn Token

デザイントークンは Serendie UI に同梱されますが、単独で使用することもできます。単独で使用する場合は、CSS 環境など React 以外でも使用できます。

### インストール

```bash
npm install @serendie/design-token
```

### CSS 内で使う

デザイントークンは CSS Variables として利用できます。
下記のように import したうえで、`var()`で参照してください。

```css
@import "@serendie/design-token/tokens.css";

h1 {
  font-size: var(--sd-reference-typography-scale-expanded-large);
  color: var(--sd-system-color-impression-primary);
}
```

### テーミング

html タグなどに、`data-panda-theme`属性 (konjo, asagi, sumire, tsutusji, kurikawa) を付与することで、CSS 環境であってもテーマを切り替えることができます。各テーマについては[こちら](https://serendie.design/foundations/theming/)を参照してください。

```html
<html data-panda-theme="asagi"></html>
```

## Serendie Symbols

React 環境において SVG コンポーネントとして Serendie Symbols を利用できます。Serendie Symbols のみ単独で使用できます。

### インストール

```bash
npm install @serendie/symbols
```

### 使い方

Serendie Symbols の一覧は[こちら](https://serendie.design/foundations/icon-list/)を参照してください。アイコン名を name props にて指定してください。アイコンには塗り (filled) と線 (outlined)のバリエーションがあり、variant props にて指定できます。

```typescript
import { SerendieSymbol } from "@serendie/symbols";

<SerendieSymbol name="home" variant="outlined" size={24} color="#000000" />;
```

## Serendie UI

React 環境を前提としています。Design Token も同梱されるので同時インストールは不要です。

### インストール

```bash
npm install @serendie/ui
```

### 準備

rootのCSSに対して、次の2行を設定してください。

1行目は、Serendie UIに対して、スタイルを適切に当てるためにカスケードレイヤーの指定をするもの、2行目は同梱のデザイントークンやデフォルトスタイルを読み込むものです。

```css
@layer reset, base, tokens, recipes, utilities;
@import "@serendie/ui/styles.css";
```

### 使い方

使いたいComponentをimportしたうえで、通常のReact Componentとして使用してください。各Componentが持つpropsについては、[ドキュメント](https://serendie.design/components/button/)や、[Storybook](https://storybook.serendie.design/?path=/story/components-button--medium)を参照してください。

```typescript
import { Button } from "@serendie/ui";

<Button size="medium">Login</Button>
```
