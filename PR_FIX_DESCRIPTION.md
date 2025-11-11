## 🐛 問題

Hugo サーバーを起動した際に、以下のエラーが発生していました：

```
Error: error building site: render: failed to render pages: render of ".../_index.md" failed:
"...index.json:16:18": execute of template failed: template: index.json:16:18:
executing "index.json" at <.Date.Format>: wrong number of args for Format: want 1 got 0
```

## 🔧 修正内容

`themes/suitcase/layouts/_default/index.json` の16行目のテンプレート構文を修正しました。

### 変更前:
```go
"date" .Date.Format "2006-01-02"
```

### 変更後:
```go
"date" (dateFormat "2006-01-02" .Date)
```

## 📝 詳細

Hugo のテンプレートでは、メソッドに複数の引数を渡す場合は括弧で囲む必要があります。
また、日付のフォーマットには `dateFormat` 関数を使用する方が Hugo の推奨する書き方です。

この修正により、以下が可能になります：
- Hugo サーバーが正常に起動する
- 検索インデックス（`/index.json`）が正しく生成される
- Fuse.js による検索機能が正常に動作する

## ✅ テスト

```bash
cd themes/suitcase/exampleSite
hugo server --themesDir ../.. --theme suitcase
```

上記コマンドでエラーなく起動することを確認しました。

## 📚 参考

- [Hugo Template Functions - dateFormat](https://gohugo.io/functions/dateformat/)
- [Hugo Template Syntax](https://gohugo.io/templates/introduction/)
