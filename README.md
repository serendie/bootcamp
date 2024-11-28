# SDS Bootcamp App

## このリポジトリについて

ブートキャンプ時のデモ用に、素朴な React アプリケーション環境を用意し、SDS Packages を使い始める流れを記載したものです。SDS Packagesを手元で試す際にご利用ください。

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

### テーミング

[デザイントークンの節で記載](https://github.com/serendie/bootcamp?tab=readme-ov-file#%E3%83%86%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0)の内容と同様です。htmlタグ等に `data-panda-theme` 属性を付与して、使用したいテーマ名(konjo, asagi, sumire, tsutusji, kurikawa)を指定してください。

```html
<html data-panda-theme="asagi"></html>
```

> [!TIP]
> ここまでがSerendie Packagesの基本的な使い方です。
> より実践的な使い方は下記を参考にしてください。

## スタイリングライブラリと併用する

あるコンポーネントのpaddingやmarginを微修正したいなど、Serendie UIのスタイルをカスタム (上書き) したいシーンでは、アプリ側にスタイリングライブラリ (CSS-in-JS系など) を導入してください。

どのスタイリングライブラリでも併用は可能ですが、Serendie UIの内部でも使用している[Panda CSS](https://panda-css.com/)を推奨しています。

### Panda CSSの導入

[アプリの環境に合わせて導入](https://panda-css.com/docs/overview/getting-started)が必要になりますが、要点を下記に記載します。

```bash
npm install -D @pandacss/dev
npx panda init --postcss
```

上記コマンドを実行したうえで、package.jsonに下記を追加してください。

```diff
{
  "scripts": {
+   "panda": "panda",
+   "prepare": "panda codegen",
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  }
}
```

また、先のコマンドで生成された `panda.config.ts` に下記を追記することで、Panda CSSの[Preset](https://panda-css.com/docs/customization/presets)とSDSのデザイントークンを繋ぎこみます。

```diff
+import { SerendiePreset } from "@serendie/ui";

export default defineConfig({
+  jsxFramework: "react",
+  presets: [SerendiePreset],
});
```

その後、Panda CSSが提供するユーティリティやコンポーネントを生成するために以下のコマンドを実行してください。

```bash
npm run panda codegen

```

TypeScript環境においては型情報を参照するために `tsconfig.json` に以下の設定を追加してください。

```diff
{
+ "include":  ["src", "styled-system"]
}
```

### 使い方

下記のように、Panda CSSの提供するユーティリティ (`css`) やレイアウトコンポーネント (`VStack`) を使いつつ、デザイントークンや、Serendie UI、Serendie Symbolsを組み合わせて画面をスタイリングすることができます。

```typescript
import { Button, TextField } from "@serendie/ui";
import { VStack } from "../styled-system/jsx";
import { css } from "../styled-system/css";
import { SerendieSymbol } from "@serendie/symbols";

function App() {
  return (
    <main
      className={css({
        padding: "sd.system.dimension.spacing.extraLarge",
        "& h1": {
          textStyle: "sd.system.typography.title.large_compact",
          marginBottom: "sd.system.dimension.spacing.extraLarge",
        },
      })}
    >
      <h1>SDS Bootcamp</h1>
      <VStack
        gap={"sd.system.dimension.spacing.extraLarge"}
        alignItems="flex-start"
      >
        <TextField label="メールアドレス" placeholder="email" />
        <TextField label="パスワード" placeholder="password" />
        <Button
          size="medium"
          className={css({ width: "100%" })}
          leftIcon={<SerendieSymbol name="login" />}
        >
          ログイン
        </Button>
        <Button styleType="ghost" size="small" className={css({ px: 0 })}>
          パスワードをお忘れですか？
        </Button>
      </VStack>
    </main>
  );
}

export default App;
```
