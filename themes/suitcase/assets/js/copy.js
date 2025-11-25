// コードブロックにコピーボタンを追加
document.addEventListener('DOMContentLoaded', function() {
  const codeBlocks = document.querySelectorAll('.post-body pre');

  codeBlocks.forEach(function(codeBlock) {
    // 既にcode-block-wrapperで囲まれている場合はスキップ
    if (codeBlock.parentNode.classList.contains('code-block-wrapper')) {
      return;
    }

    // コピーボタンを作成
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.setAttribute('aria-label', 'コードをコピー');
    copyButton.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.75 4.75H10.25V1.75H5.75V4.75ZM4.5 1.75C4.5 1.05964 5.05964 0.5 5.75 0.5H10.25C10.9404 0.5 11.5 1.05964 11.5 1.75V4.75H13.25C13.9404 4.75 14.5 5.30964 14.5 6V13.25C14.5 13.9404 13.9404 14.5 13.25 14.5H2.75C2.05964 14.5 1.5 13.9404 1.5 13.25V6C1.5 5.30964 2.05964 4.75 2.75 4.75H4.5V1.75ZM2.75 6V13.25H13.25V6H2.75Z" fill="currentColor"/></svg>';

    // 親要素が.highlightの場合は、.highlightにcode-block-wrapperクラスを追加
    const parent = codeBlock.parentNode;
    if (parent.classList.contains('highlight')) {
      parent.classList.add('code-block-wrapper');
      parent.appendChild(copyButton);
    } else {
      // ラッパーを作成してコードブロックを包む
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';
      parent.insertBefore(wrapper, codeBlock);
      wrapper.appendChild(codeBlock);
      wrapper.appendChild(copyButton);
    }

    // コピー機能
    copyButton.addEventListener('click', async function() {
      const code = codeBlock.querySelector('code');
      const text = code ? code.textContent : codeBlock.textContent;

      try {
        await navigator.clipboard.writeText(text);

        // コピー成功のフィードバック
        copyButton.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" fill="currentColor"/></svg>';
        copyButton.classList.add('copied');

        // 2秒後に元に戻す
        setTimeout(function() {
          copyButton.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.75 4.75H10.25V1.75H5.75V4.75ZM4.5 1.75C4.5 1.05964 5.05964 0.5 5.75 0.5H10.25C10.9404 0.5 11.5 1.05964 11.5 1.75V4.75H13.25C13.9404 4.75 14.5 5.30964 14.5 6V13.25C14.5 13.9404 13.9404 14.5 13.25 14.5H2.75C2.05964 14.5 1.5 13.9404 1.5 13.25V6C1.5 5.30964 2.05964 4.75 2.75 4.75H4.5V1.75ZM2.75 6V13.25H13.25V6H2.75Z" fill="currentColor"/></svg>';
          copyButton.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('コピーに失敗しました:', err);
      }
    });
  });
});
