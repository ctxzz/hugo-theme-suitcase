# 🧳 Hugo Theme: Suitcase

**Suitcase** は、AI Knowledge Suitcase 専用に設計された Hugo テーマです。
AIと人間が共同で生成した知識を美しく可視化し、体系的に整理するためのミニマルで拡張性の高いテーマです。

## 🎯 特徴

- **ミニマルで美しいUI** - 知識に集中できる静かな書斎のようなデザイン
- **ダークモード対応** - デフォルトでダークモード、ワンクリックでライトモードに切替可能
- **Front Matter連携** - `topics`, `tags`, `confidence`, `stage`, `visibility` などのメタ情報を自動で可視化
- **高度な検索機能** - Fuse.js を使用した高速で正確な全文検索
- **レスポンシブデザイン** - デスクトップ、タブレット、モバイルに完全対応
- **関連記事の自動表示** - Hugo の関連記事機能を活用した知識のつながりの可視化

## 📦 インストール

### Git Submodule として追加

```bash
cd your-hugo-site
git submodule add https://github.com/yourname/hugo-theme-suitcase themes/suitcase
```

### 手動インストール

```bash
cd your-hugo-site/themes
git clone https://github.com/yourname/hugo-theme-suitcase suitcase
```

## ⚙️ 設定

`config.toml` (または `hugo.toml`) に以下の設定を追加してください。

```toml
theme = "suitcase"
title = "AI Knowledge Suitcase"

[params]
  description = "AI Knowledge Suitcase — 知識を旅するための静かな書斎"
  footerText = "知識を旅するための静かな書斎"
  sidebarText = "AIと人間が共同で生成した知識を体系的に保存・再利用するためのナレッジベースです。"

# 検索インデックスの生成を有効化
[outputs]
  home = ["HTML", "RSS", "JSON"]

# タクソノミー設定
[taxonomies]
  tag = "tags"
  topic = "topics"

# メニュー設定（オプション）
[[menu.main]]
  name = "タグ"
  url = "/tags/"
  weight = 1

[[menu.main]]
  name = "トピック"
  url = "/topics/"
  weight = 2
```

## 📝 Front Matter の使い方

記事のメタデータには以下のフィールドを使用できます：

```yaml
---
title: "記事のタイトル"
date: 2025-01-15
updated: "2025-01-20"
topics: ["AI", "機械学習"]
tags: ["Hugo", "テーマ", "ナレッジベース"]
confidence: "高"
stage: "完成"
visibility: "public"
related: ["/posts/related-article-1", "/posts/related-article-2"]
---
```

### フィールドの説明

- **title**: 記事のタイトル（必須）
- **date**: 作成日（必須）
- **updated**: 更新日（オプション）
- **topics**: トピックのリスト（カテゴリーのような役割）
- **tags**: タグのリスト
- **confidence**: 信頼度（例: "高", "中", "低"）
- **stage**: ステージ（例: "草案", "レビュー中", "完成"）
- **visibility**: 公開設定（`public` または未設定で公開、その他の値で非公開）
- **related**: 手動で設定する関連記事のパス

## 🎨 カスタマイズ

### 配色のカスタマイズ

`assets/css/main.css` と `assets/css/dark.css` を編集することで、配色をカスタマイズできます。

主要な色の変数：
- ダークモード背景: `#0d0d0d`
- ダークモードテキスト: `#e0e0e0`
- アクセントカラー: `#7cc0ff`

### ロゴとファビコンの変更

`themes/suitcase/static/logo.svg` と `themes/suitcase/static/favicon.svg` を置き換えることで、独自のロゴとファビコンを使用できます。

## 🔍 検索機能

検索機能を有効にするには、`config.toml` で JSON 出力を有効化する必要があります：

```toml
[outputs]
  home = ["HTML", "RSS", "JSON"]
```

これにより、`/index.json` が自動生成され、Fuse.js による高速検索が可能になります。

## 🚀 使用例

### ローカル開発サーバーの起動

```bash
hugo server -D
```

### 本番ビルド

```bash
hugo --minify
```

### GitHub Pages へのデプロイ

`.github/workflows/hugo.yml` を作成し、GitHub Actions でデプロイできます。

## 📄 ライセンス

MIT License

## 🙏 謝辞

このテーマは、AI Knowledge Suitcase プロジェクトの一環として開発されました。
AIと人間が協力して知識を構築するための新しい形を模索しています。

## 🔗 リンク

- [Hugo 公式サイト](https://gohugo.io/)
- [Fuse.js](https://fusejs.io/)
- [AI Knowledge Suitcase プロジェクト](https://github.com/yourname/ai-knowledge-suitcase)

---

**Enjoy your knowledge journey! 🧳✨**
