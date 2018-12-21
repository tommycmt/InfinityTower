var skill_list  = {Fireball: { type: "inte",
                               cost: 5,
                               base_dam: 0.3, 
                               multi: 1.3,
                               cd: 2,
                   },
                   Explosion:{ type: "inte",
                               cost: 10,
                               base_dam: 0.5,
                               multi: 1.5,
                               cd: 3.
                   }};
                               
                    

var player_list = [{id:0,
                    name:"惠惠",
                    icon: { normal: "(∩ ◕_▩ )∩",
                            atk: "(∩ ◕_▩ )⊃━☆ Explosion",
                            damaged: ".｡･ﾟﾟ･(＞_＜)･ﾟﾟ･｡.",
                            dead: "(✖╭╮✖)",
                    },
                    skills : [
                      {name: "Fireball", lv: 1},
                      {name: "Explosion", lv: 0},
                    ],
                    str:10, 
                    dex:10,
                    inte:20,
                    gold: 0,
                    exp: 0
                  }]
                            
var monster_name_list = ["Tanglething", "Corpsefreak", "Abysssoul", "Fetidmonster", "The Ancient Mutt"]
var monster_icon_list = [ 
                      { id: 0,
                        icon: { normal: "Ψ(●｀▽´● )Ψ",
                                atk: "(~~~~~~~[]=¤Ψ(●｀▽´● )Ψ",
                                damaged: "ヽ ( ꒪д꒪ )ﾉ",
                                dead: "(+_+)",
                        }
                      },
                      { id: 1,
                        icon: { normal: "(▀̿̿Ĺ̯̿̿▀̿ ̿)",
                                atk: "╾━╤デ╦︻(▀̿̿Ĺ̯̿̿▀̿ ̿)",
                                damaged: "〣( ºΔº )〣",
                                dead: "(✖╭╮✖)",
                        }
                      },
                      { id: 2,
                        icon: { normal: "(˵☯‿☯˵ )",
                                atk: "╾━╤デ╦︻\_(˵☯‿☯˵)",
                                damaged: "(／。＼)",
                                dead: "（ｘ＿ｘ*）",
                        }
                      },
                    ]