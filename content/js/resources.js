var skill_list  = {Fireball: { type: "inte",
                               cost: 7,
                               base: 0, 
                               multi: 1.3,
                               base_cd: 2,
                   },
                   Explosion:{ type: "inte",
                               cost: 15,
                               base: 1, 
                               multi: 1.7,
                               base_cd: 3,
                              
                   }};
                
var player_list = [{id:0,
                    name:"惠惠",
                    icon: { normal: "(∩ ◕_▩ )∩",
                            atk: "(∩ ◕_▩ )⊃━☆ Explosion",
                            damaged: ".｡･ﾟﾟ･(＞_＜)･ﾟﾟ･｡.",
                            dead: "(✖╭╮✖)",
                    },
                    skills : {"Fireball": {"lv": 1, "cd": 0},
                              "Explosion": {"lv": 0, "cd": 0},
                    },
                    str:10, 
                    dex:10,
                    inte:20,
                    gold: 20,
                    exp: 50,
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