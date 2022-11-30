// dummy response data with wining grid 
let data = [
    {
        "response": {
            "results": {
                "win": 10,
                "WinningIDs": [
                    [2],
                    [3],
                    [2],
                    [1]

                ]
            }
        }
    },
    {
        "response": {
            "results": {
                "win": 8,
                "WinningIDs": [
                    [4],
                    [4],
                    [4],
                    [1]
                ]
            }
        }
    },
    {
        "response": {
            "results": {
                "win": 7,
                "WinningIDs": [
                    [0],
                    [0],
                    [1],
                    [4]
                ]
            }
        }
    },
    {
        "response": {
            "results": {
                "win": 3,
                "WinningIDs": [
                    [5],
                    [5],
                    [5],
                    [3]
                ]
            }
        }
    },
    {
        "response": {
            "results": {
                "win": 10,
                "WinningIDs": [
                    [2],
                    [2],
                    [2],
                    [1]
                ]
            }
        }
    },

]
// simple application configuration
let config = { width: 1340, height: 600 }
let app;
let balance = 1000;
let cost = 40;
var symbol_0, symbol_1, symbol_2, symbol_3, symbol_4, symbol_5, reelsBg;
const REEL_WIDTH = 250;
const SYMBOL_SIZE = 120;
let randomNo = Math.floor(Math.random() * 3);
let response = data[randomNo].response.results;
response.win = 0 ; 
let betlevel = [1, 2, 3, 4, 5];
let betCount = 0;
let bet = betlevel[0] * cost;
const reels = [];
// wait for DOM before creating application
window.addEventListener('load', function () {
    //Create a Pixi Application
    app = new PIXI.Application(config);
    //Add the canvas that Pixi automatically created for you to the HTML document
    app.loader
        .add('symbol_0', '/assets/symbols/symbol_00.json')
        .add('symbol_1', '/assets/symbols/symbol_01.json')
        .add('symbol_2', '/assets/symbols/symbol_02.json')
        .add('symbol_3', '/assets/symbols/symbol_03.json')
        .add('symbol_4', '/assets/symbols/symbol_04.json')
        .add('symbol_5', '/assets/symbols/symbol_05.json')
        .add('reelsBg',  '/assets/reelsBg.jpg')
        .load(function (loader, resources) {
            symbol_0 = app.stage.addChild(new PIXI.spine.Spine(resources.symbol_0.spineData));
            symbol_0.position.set(app.renderer.width * 0.5, app.renderer.height + 100);
            symbol_0.state.setAnimation(0, "static", true);
            symbol_0.state.timeScale = 0.5;

            symbol_1 = app.stage.addChild(new PIXI.spine.Spine(resources.symbol_1.spineData));
            symbol_1.position.set(app.renderer.width * 0.5, app.renderer.height + 100);
            symbol_1.state.setAnimation(0, "static", true);
            symbol_1.state.timeScale = 0.5;

            symbol_2 = app.stage.addChild(new PIXI.spine.Spine(resources.symbol_2.spineData));
            symbol_2.position.set(app.renderer.width * 0.5, app.renderer.height + 100);
            symbol_2.state.setAnimation(0, "static", true);
            symbol_2.state.timeScale = 0.5;

            symbol_3 = app.stage.addChild(new PIXI.spine.Spine(resources.symbol_3.spineData));
            symbol_3.position.set(app.renderer.width * 0.5, app.renderer.height + 100);
            symbol_3.state.setAnimation(0, "static", true);
            symbol_3.state.timeScale = 0.5;

            symbol_4 = app.stage.addChild(new PIXI.spine.Spine(resources.symbol_4.spineData));
            symbol_4.position.set(app.renderer.width * 0.5, app.renderer.height + 100);
            symbol_4.state.setAnimation(0, "static", true);
            symbol_4.state.timeScale = 0.5;

            symbol_5 = app.stage.addChild(new PIXI.spine.Spine(resources.symbol_5.spineData));
            symbol_5.position.set(app.renderer.width * 0.5, app.renderer.height + 100);
            symbol_5.state.setAnimation(0, "static", true);
            symbol_5.state.timeScale = 0.5;
            onLoadingcomplete();
        });

    function onLoadingcomplete() {
        reelsBg = app.stage.addChild(new PIXI.Sprite.fromImage('reelsBg'));
        reelsBg.x = 126;
        reelsBg.y = 130;
        reelsBg.scale.set(1.1);
        const symbols_Data = [
            symbol_0,
            symbol_1,
            symbol_2,
            symbol_3,
            symbol_4,
            symbol_5
        ];
        createReels();
        const top = new PIXI.Graphics();
        top.drawRect(0, 0, 800, config.height * 0.23);
        const bottom = new PIXI.Graphics();
        bottom.drawRect(0, config.height, 800, config.height * 0.15);
        bottom.pivot.y = config.height * 0.15;

        const style = new PIXI.TextStyle({
            fontFamily: 'CocaCola',
            fontSize: 30,
            fontWeight: 'bold',
            fill: '#ffffff'

        });

        const spinText = new PIXI.Text('CLICK TO SPIN', style);
        spinText.x = config.width * 0.85;
        spinText.y = config.height + bottom.height / 3;
        spinText._anchor._x = 0.5;
        spinText._anchor._Y = 0.5;
        bottom.addChild(spinText);

        const balanceText = new PIXI.Text('Balance : ' + balance, style);
        balanceText.x = config.width * 0.22;
        balanceText.y = config.height + bottom.height / 3;
        balanceText._anchor._x = 0.5;
        balanceText._anchor._Y = 0.5;
        bottom.addChild(balanceText);

        const bettInc = new PIXI.Text('+', style);
        bettInc.x = config.width * 0.70;
        bettInc.y = config.height + bottom.height / 3;
        bettInc._anchor._x = 0.5;
        bettInc._anchor._Y = 0.5;
        bottom.addChild(bettInc);


        bettInc.interactive = true;
        bettInc.buttonMode = true;
        bettInc.addListener('pointerdown', () => {
            updateBet(true);
        });

        const betDec = new PIXI.Text('-', style);
        betDec.x = config.width * 0.54;
        betDec.y = config.height + bottom.height / 3;
        betDec._anchor._x = 0.5;
        betDec._anchor._Y = 0.5;
        bottom.addChild(betDec);

        betDec.interactive = false;
        betDec.buttonMode = true;
        betDec.addListener('pointerdown', () => {
            updateBet(false);

        });

        const betText = new PIXI.Text('STAKE : ' + bet, style);
        betText.x = config.width * 0.62;
        betText.y = config.height + bottom.height / 3;
        betText._anchor._x = 0.5;
        betText._anchor._Y = 0.5;
        bottom.addChild(betText);

        const winText = new PIXI.Text('Win : ' + response.win, style);
        winText.x = config.width * 0.40;
        winText.y = config.height + bottom.height / 3;
        winText._anchor._x = 0.5;
        winText._anchor._Y = 0.5;
        bottom.addChild(winText);

        app.stage.addChild(top);
        app.stage.addChild(bottom);

        spinText.interactive = true;
        spinText.buttonMode = true;
        spinText.addListener('pointerdown', () => {
            spinText.interactive = false;
            bettInc.interactive = false;
            betDec.interactive = false;
            updateBalance(true);
            startSpin();
            randomNo = Math.floor(Math.random() * 3);
            response = data[randomNo].response.results;
        });
        // funtion to update bet 
        function updateBet(value) {
            if (value) {
                betDec.interactive = true;
                betCount++;
                bet = cost * betlevel[betCount];
                if (betCount === betlevel.length - 1) {
                    bettInc.interactive = false;
                }
            } else {
                bettInc.interactive = true;
                betCount--;
                bet = cost * betlevel[betCount];
                if (betCount === 0) {
                    betDec.interactive = false;
                }
            }
            betText.text = "STAKE : " + bet;
        }

        //fuction to update balance
        function updateBalance(value) {
            if (value) {
                balance = balance - bet;
                winText.text = "Win : 0";
            } else {
                balance = balance + response.win;
                winText.text = "Win : " + response.win;
            }
            balanceText.text = "Balance : " + balance;
        }

        function createReels() {
            const reelContainer = new PIXI.Container();
            for (let i = 0; i < 4; i++) {
                const reelCont = new PIXI.Container();
                reelCont.x = i * REEL_WIDTH;
                reelContainer.addChild(reelCont);

                const reel = {
                    container: reelCont,
                    symbols: [],
                    position: 0,
                    previousPosition: 0,
                    blur: new PIXI.filters.BlurFilter(),
                };
                reel.blur.blurX = 0;
                reel.blur.blurY = 0;
                reelCont.filters = [reel.blur];

                for (let j = 0; j < 1; j++) {
                    const symbol = new PIXI.spine.Spine(symbols_Data[response.WinningIDs[i][j]].spineData);
                    symbol.y = j * SYMBOL_SIZE;
                    symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
                    symbol.x = Math.round((SYMBOL_SIZE - symbol.width) - 20 / 2);
                    symbol.state.setAnimation(0, "static", true);
                    reel.symbols.push(symbol);
                    reelCont.addChild(symbol);
                }
                reels.push(reel);
            }

            reelContainer.pivot.x = reelContainer.width / 2;
            reelContainer.pivot.y = reelContainer.height / 2;
            reelContainer.y = 455;
            reelContainer.x = 755;
            app.stage.addChild(reelContainer);
        }
        let running = false;

        // On Play Pressed 
        function startSpin() {
            if (running) return;
            running = true;
            for (let i = 0; i < reels.length; i++) {
                reels[i].symbols[0].state.setAnimation(0, "static", true);
            }
            for (let i = 0; i < reels.length; i++) {
                const r = reels[i];
                const target = r.position + 10 + i * 5;
                const time = 3000 + 1000 * i;
                tweenTo(r, 'position', target, time, backout(0.4), null, i === reels.length - 1 ? reelsComplete : null);
            }
        }

        // On Spin Stop
        function reelsComplete() {
            randomNo = Math.floor(Math.random() * 3);
            response = data[randomNo].response.results;
            running = false;
            console.log(response.win);
            if (response?.win) {
                for (let i = 0; i < reels.length; i++) {
                    reels[i].symbols[0].state.setAnimation(0, "win", true);
                }
            }
            spinText.interactive = true;
            if (betCount !== 0) {
                betDec.interactive = true;
            }
            if (betCount !== betlevel.length - 1) {
                bettInc.interactive = true;
            }
            updateBalance(false);
        }

        app.ticker.add((delta) => {
            for (let i = 0; i < reels.length; i++) {
                const r = reels[i];
                r.blur.blurY = (r.position - r.previousPosition) * 8;
                r.previousPosition = r.position;

                for (let j = 0; j < r.symbols.length; j++) {
                    const s = r.symbols[j];
                    const prevy = s.y;
                    s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
                    if (s.y < 0) {
                        s.texture = symbols_Data[response.WinningIDs[i][j]];
                        s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height);
                        s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
                    }
                }
            }
        });
    }

    const tweening = [];

    function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
        const tween = {
            object,
            property,
            propertyBeginValue: object[property],
            target,
            easing,
            time,
            change: onchange,
            complete: oncomplete,
            start: Date.now(),
        };

        tweening.push(tween);
        return tween;
    }
    app.ticker.add((delta) => {
        const now = Date.now();
        const remove = [];
        for (let i = 0; i < tweening.length; i++) {
            const t = tweening[i];
            const phase = Math.min(1, (now - t.start) / t.time);

            t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
            if (t.change) t.change(t);
            if (phase === 1) {
                t.object[t.property] = t.target;
                if (t.complete) t.complete(t);
                remove.push(t);
            }
        }
        for (let i = 0; i < remove.length; i++) {
            tweening.splice(tweening.indexOf(remove[i]), 1);
        }
    });

    function lerp(a1, a2, t) {
        return a1 * (1 - t) + a2 * t;
    }

    function backout(amount) {
        return (t) => (--t * t * ((amount + 1) * t + amount) + 1);
    }

    document.body.appendChild(app.view);
});