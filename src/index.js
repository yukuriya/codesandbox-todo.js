import "./styles.css";

const onClickAdd = () => {
  //テキストボックスの値を取得
  const inputText = document.getElementById("add-text").value;
  //テキストボックスの値を初期化する
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

//未完了リストから指定の要素を削除する関数
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

//未完了リストに追加する関数
const createIncompleteList = (text) => {
  //divタグ生成
  const div = document.createElement("div");
  //クラスをつける
  div.className = "list-row";

  //liタグ生成
  const li = document.createElement("li");
  li.innerText = text;

  //button（完了）タグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    //押された完了ボタンの親タグ(div)を未完了リストから削除
    deleteFromIncompleteList(completeButton.parentNode);

    //完了リストに追加する要素
    const addTarget = completeButton.parentNode;
    //divタグの中にある最初の子要素のインナーテキストを取得
    const text = addTarget.firstElementChild.innerText;

    //div以下を初期化
    addTarget.textContent = null;

    //liタグ生成
    const li = document.createElement("li");
    li.innerText = text;

    //戻すボタン生成
    const returnButton = document.createElement("button");
    returnButton.innerText = "戻す";
    returnButton.addEventListener("click", () => {
      //押された戻すボタンの親タグ(div)を完了リストから削除
      const deleteTarget = returnButton.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);

      //divタグの中にある最初の子要素のインナーテキストを取得
      const text = deleteTarget.firstElementChild.innerText;

      //これより先はインプットからTODOを追加する処理と同じだから再びcreateIncompleteList関数を呼び出す
      createIncompleteList(text);
    });

    //divタグの子要素に各要素を設定
    addTarget.appendChild(li);
    addTarget.appendChild(returnButton);

    document.getElementById("complete-list").appendChild(addTarget);
  });

  //button（削除）タグ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    //押された削除ボタンの親タグ(div)を未完了リストから削除
    deleteFromIncompleteList(deleteButton.parentNode);
  });

  //liタグの子要素に各要素を設定
  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  //未完了リストに追加
  document.getElementById("incomplete-list").appendChild(div);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
