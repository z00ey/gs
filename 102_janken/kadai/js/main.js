//ダメージ処理
function damageHp(hp) {
    hp--;
    return hp;
};
//じゃんけん終わり判定
function finChk(hp) {
    if (hp > 0) {
        return 0;
    } else {
        return 1;
    }
};

$(function () {
    var myhp = 4;       //自分のHP
    var pchp = 4;       //コンピューターのHP
    var myhp_g;         //自分のHPゲージ
    var pchp_g;         //コンピューターのHPゲージ
    var mylose = 0;     //自分の負けフラグ
    var pclose = 0;     //コンピューターの負けフラグ
    var myhand;         //自分の手
    var pchand;         //コンピューターの手
    var gyanken = ["グー", "チョキ", "パー"];
    // var atti_arr = ["うえ", "した", "みぎ", "ひだり"];
    // var attiWinFlg;
    var jankenResult;   //じゃんけんの結果 0:勝ち 1:負け 2:あいこ

    //コンピューターの手をランダムで入れる処理
    function randHand() {
        const num = Math.floor(Math.random() * 3);
        let pc = "";
        pc = gyanken[num];
        return pc;
    };
    //コンピュータの手を表示する処理
    function dispPcHand(pchand) {
        $('#hand').removeClass();
        $('#hand').text("コンピュータの出した手:" + pchand);
        if (pchand == "グー") {
            $('#hand').addClass('pchand_gu');
        } else if (pchand == "チョキ") {
            $('#hand').addClass('pchand_cho');
        } else if (pchand == "パー") {
            $('#hand').addClass('pchand_pa');
        }
    };
    //リセット処理(呼ばれるやつ)
    function resetDisp() {
        $('#hand').text("コンピュータの出した手は？");
        $('#judgment').text("結果は？");
        $('#judgment').css('color', 'black');
        $('#pchp_g').val(1);
        $('#myhp_g').val(1);
        // $('#myhp').text("あなたのHP：" + myhp);
        // $('#chp').text("コンピュータのHP：" + pchp);
    };


    //じゃんけんの勝ち負け判定処理
    function judgeJanken(myhand, pchand) {
        if (myhand == "グー") {
            if (pchand == "グー") {
                return 2; //あいこ
            } else if (pchand == "チョキ") {
                return 0; //勝ち
            } else if (pchand == "パー") {
                return 1; //負け
            }
        } else if (myhand == "チョキ") {
            if (pchand == "グー") {
                return 1; //負け
            } else if (pchand == "チョキ") {
                return 2; //あいこ
            } else if (pchand == "パー") {
                return 0; //勝ち
            }
        } else if (myhand == "パー") {
            if (pchand == "グー") {
                return 0; //勝ち
            } else if (pchand == "チョキ") {
                return 1; //負け
            } else if (pchand == "パー") {
                return 2; //あいこ
            }
        };
    };

    // じゃんけんボタン
    $('#gu_btn, #cho_btn, #par_btn').on('click', function () {
        attiWinFlg = null;
        if (mylose == 0 && pclose == 0) {
            myhand = $(this).text();
            pchand = randHand();
            dispPcHand(pchand);
            jankenResult = judgeJanken(myhand, pchand);
            //勝ち
            if (jankenResult == 0) {
                pchp = damageHp(pchp);
                pchp_g = $('#pchp_g').val();
                pchp_g = pchp_g - 0.25;
                console.log(pchp_g);
                $('#pchp_g').val(pchp_g);
                $('#judgment').text("勝ち");
                $('#judgment').css('color', 'red');
                attiWinFlg = 0;
            }
            //負け
            else if (jankenResult == 1) {
                myhp = damageHp(myhp);
                myhp_g = $('#myhp_g').val();
                myhp_g = myhp_g - 0.25;
                $('#myhp_g').val(myhp_g);
                $('#judgment').text("負け");
                $('#judgment').css('color', 'blue');
                attiWinFlg = 1;
            }
            //あいこ
            else if (jankenResult == 2) {
                $('#judgment').text("あいこ");
                $('#judgment').css('color', 'black');
            }
            mylose = finChk(myhp);
            pclose = finChk(pchp);
            console.log(mylose, pclose);
        } else {
            console.log("wakaran");
        };
    });

    //リセットボタン
    $('#more').on('click', function () {
        if (mylose == 0 && pclose == 0) {
            //どちらかのHPが0でないときは
            //なにもしない
        } else {
            mylose = 0;
            pclose = 0;
            myhp = 3;
            pchp = 3;
            resetDisp();
            console.log(mylose, pclose);
        };
    });

    // function attiMuite(whowin) {
    //     $('#ue_btn, #migi_btn, #hidari_btn, #shita_btn').on('click', function () {
    //         pc_atti = randAtti();
    //         $('#hand_a').text("コンピュータの出した手:" + pc_atti);
    //         var my_atti = $(this).text();
    //         if ((my_atti == pc_atti) && whowin == "me") {    //じゃん勝ちが自分
    //             $('#attimuite_hoi').text("かった！！！！");
    //             return 1; //勝ち
    //         } else if ((my_atti == pc_atti) && whowin == "pc") {    //じゃん勝ちがPC
    //             $('#attimuite_hoi').text("まけた！！！！");
    //             return 2; //負け
    //         } else {
    //             $('#attimuite_hoi').text("もういっかい！");
    //             return 0; //引き分け
    //         };
    //     });
    // };
    // $('#ue_btn, #migi_btn, #hidari_btn, #shita_btn').on('click', function () {
    //     if (attiWinFlg == 0 || attiWinFlg == 1) {
    //         pc_atti = randAtti();
    //         $('#hand_a').text("コンピュータの出した手:" + pc_atti);
    //         var my_atti = $(this).text();
    //         if ((my_atti == pc_atti) && attiWinFlg == 0) {    //じゃん勝ちが自分
    //             $('#attimuite_hoi').text("かった！！！！");
    //             pchp = damageHp(pchp);
    //             console.log("ダメージを与える");
    //         } else if ((my_atti == pc_atti) && attiWinFlg == 1) {    //じゃん勝ちがPC
    //             $('#attimuite_hoi').text("まけた！！！！");
    //             myhp = damageHp(myhp);
    //             console.log("ダメージを受けた");
    //         } else {
    //             $('#attimuite_hoi').text("もういっかい！"); //引き分け
    //         };
    //     } else {
    //         //なにもしない
    //     };
    // });
    // function randAtti() {
    //     const num = Math.floor(Math.random() * 4);
    //     let pc2 = "";
    //     pc2 = atti_arr[num];
    //     return pc2;
    // };

});






