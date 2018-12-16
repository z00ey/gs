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
    let num = 1;

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

    //コンピューターの手をランダムで入れる処理
    function randHand() {
        const num = Math.floor(Math.random() * 3);
        let pc = "";
        pc = gyanken[num];
        return pc;
    };

    //コンピュータの手を表示する処理
    function dispPcHand(pchand) {
        $('#pc_hand').removeClass();
        $('#pc_hand').text("コンピュータの出した手:" + pchand);
        if (pchand == "グー") {
            $('#pc_hand').addClass('pchand_gu');
        } else if (pchand == "チョキ") {
            $('#pc_hand').addClass('pchand_cho');
        } else if (pchand == "パー") {
            $('#pc_hand').addClass('pchand_pa');
        }
    };

    //リセット処理(呼ばれるやつ)
    function resetDisp() {
        $('#pc_hand').text("コンピュータの出した手は？");
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

    function dispRandHand() {
        function randHand(num) {
            var hoge = num;
            if (hoge == 1) {
                $('#pc_hand').addClass('pchand_gu');
                $('#pc_hand').removeClass('pchand_cho');
                $('#pc_hand').removeClass('pchand_pa');
            } else if (hoge == 2) {
                $('#pc_hand').addClass('pchand_cho');
                $('#pc_hand').removeClass('pchand_gu');
                $('#pc_hand').removeClass('pchand_pa');
            } else if (hoge == 3) {
                $('#pc_hand').addClass('pchand_pa');
                $('#pc_hand').removeClass('pchand_cho');
                $('#pc_hand').removeClass('pchand_gu');
            }
        };

        timer = setInterval(() => {
            randHand(num);
            if (num == 3) {
                num = 1;
            } else {
                num++;
            }
        }, 200);
    };

    function dispResult(mylose, pclose) {
        if (mylose == 1) {
            $('#judgment').text("あなたの負けです…");
            $('#judgment').css('color', 'blue');
        } else if (pclose == 1) {
            $('#judgment').text("あなたの勝ちです！！！");
            $('#judgment').css('color', 'red');
        } else {
            //なにもしない
        }
    };

    //PCの手をランダム表示する処理を実行する
    dispRandHand();

    // じゃんけんボタン
    $('#gu_btn, #cho_btn, #par_btn').on('click', function () {
        if (mylose == 0 && pclose == 0) {
            myhand = $(this).text();
            console.log(myhand);
            pchand = randHand();
            dispPcHand(pchand);
            jankenResult = judgeJanken(myhand, pchand);
            clearInterval(timer);
            //勝ち
            if (jankenResult == 0) {
                pchp = damageHp(pchp);
                pchp_g = $('#pchp_g').val();
                pchp_g = pchp_g - 0.25;
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
            dispResult(mylose, pclose);
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
            myhp = 4;
            pchp = 4;
            dispRandHand();
            resetDisp()
            console.log(mylose, pclose);
        };
    });

    // function attiMuite(whowin) {
    //     $('#ue_btn, #migi_btn, #hidari_btn, #shita_btn').on('click', function () {
    //         pc_atti = randAtti();
    //         $('#pc_hand_a').text("コンピュータの出した手:" + pc_atti);
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
    //         $('#pc_hand_a').text("コンピュータの出した手:" + pc_atti);
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







