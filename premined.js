// Pre-mined MaximaMiner Algorithm Database
window.PREMINED_DATABASE = {
  "x*exp(x^2)": {
    "input": "x * exp(x^2)",
    "variable": "x",
    "command": "integrate(x * exp(x^2), x)",
    "final_result": "%e^x^2/2",
    "algorithm": {
      "aic": "ALG-HEUR-DIFFDIV",
      "name": "Derivative-Divides Heuristic",
      "priority": 10,
      "description": "Solved by detecting f(u(x)) * u'(x) pattern substitution directly."
    },
    "attempted_heuristics": [],
    "details": [
      "diffdiv evaluated: %e^x^2/2"
    ],
    "call_tree_text": "\u2022 [sinint] args: [x*%e^x^2,x] -> %e^x^2/2\n  \u2022 [integrator] args: [x*%e^x^2,x] -> %e^x^2/2\n    \u2022 [diffdiv] args: [x*%e^x^2,x] -> %e^x^2/2",
    "call_tree": [
      {
        "func": "sinint",
        "depth": 0,
        "args": "[x*%e^x^2,x]",
        "result": "%e^x^2/2",
        "children": [
          {
            "func": "integrator",
            "depth": 1,
            "args": "[x*%e^x^2,x]",
            "result": "%e^x^2/2",
            "children": [
              {
                "func": "diffdiv",
                "depth": 2,
                "args": "[x*%e^x^2,x]",
                "result": "%e^x^2/2",
                "children": []
              }
            ]
          }
        ]
      }
    ],
    "raw_output": "display2d:false\nfalse\ntrace(sinint,integrator,diffdiv,ratint,trigint,rischint)\n[sinint,integrator,diffdiv,ratint,trigint,rischint]\nintegrate(x*exp(x^2),x)\n1 Enter sinint [x*%e^x^2,x]\n 1 Enter integrator [x*%e^x^2,x]\n  1 Enter diffdiv [x*%e^x^2,x]\n  1 Exit  diffdiv %e^x^2/2\n 1 Exit  integrator %e^x^2/2\n1 Exit  sinint %e^x^2/2\n%e^x^2/2\n",
    "preset_label": "Derivative-Divides Heuristic"
  },
  "1/(x^3+1)": {
    "input": "1 / (x^3 + 1)",
    "variable": "x",
    "command": "integrate(1 / (x^3 + 1), x)",
    "final_result": "(-log(x^2-x+1)/6)+atan((2*x-1)/sqrt(3))/sqrt(3)+log(x+1)/3",
    "algorithm": {
      "aic": "ALG-RATINT",
      "name": "Rational Function Integration (Hermite / Partial Fractions)",
      "priority": 30,
      "description": "Solved via exact algebraic decomposition over polynomial ring Q[x]."
    },
    "attempted_heuristics": [
      "diffdiv (Derivative-Divides: Failed)"
    ],
    "details": [
      "ratint evaluated rational integrand to: (-log(x^2-x+1)/6)+atan((2*x-1)/sqrt(3))/sqrt(3)+log(x+1)/3"
    ],
    "call_tree_text": "\u2022 [sinint] args: [1/(x^3+1),x] -> (-log(x^2-x+1)/6)+atan((2*x-1)/sqrt(3))/sqrt(3)+log(x+1)/3\n  \u2022 [integrator] args: [1/(x^3+1),x] -> (-log(x^2-x+1)/6)+atan((2*x-1)/sqrt(3))/sqrt(3)+log(x+1)/3\n    \u2022 [diffdiv] args: [1/(x^3+1),x] -> false\n    \u2022 [ratint] args: [1/(x^3+1),x] -> (-log(x^2-x+1)/6)+atan((2*x-1)/sqrt(3))/sqrt(3)+log(x+1)/3",
    "call_tree": [
      {
        "func": "sinint",
        "depth": 0,
        "args": "[1/(x^3+1),x]",
        "result": "(-log(x^2-x+1)/6)+atan((2*x-1)/sqrt(3))/sqrt(3)+log(x+1)/3",
        "children": [
          {
            "func": "integrator",
            "depth": 1,
            "args": "[1/(x^3+1),x]",
            "result": "(-log(x^2-x+1)/6)+atan((2*x-1)/sqrt(3))/sqrt(3)+log(x+1)/3",
            "children": [
              {
                "func": "diffdiv",
                "depth": 2,
                "args": "[1/(x^3+1),x]",
                "result": "false",
                "children": []
              },
              {
                "func": "ratint",
                "depth": 2,
                "args": "[1/(x^3+1),x]",
                "result": "(-log(x^2-x+1)/6)+atan((2*x-1)/sqrt(3))/sqrt(3)+log(x+1)/3",
                "children": []
              }
            ]
          }
        ]
      }
    ],
    "raw_output": "display2d:false\nfalse\ntrace(sinint,integrator,diffdiv,ratint,trigint,rischint)\n[sinint,integrator,diffdiv,ratint,trigint,rischint]\nintegrate(1/(x^3+1),x)\n1 Enter sinint [1/(x^3+1),x]\n 1 Enter integrator [1/(x^3+1),x]\n  1 Enter diffdiv [1/(x^3+1),x]\n  1 Exit  diffdiv false\n  1 Enter ratint [1/(x^3+1),x]\n  1 Exit  ratint (-log(x^2-x+1)/6)+atan((2*x-1)/sqrt(3))/sqrt(3)+log(x+1)/3\n 1 Exit  integrator (-log(x^2-x+1)/6)+atan((2*x-1)/sqrt(3))/sqrt(3)+log(x+1)/3\n1 Exit  sinint (-log(x^2-x+1)/6)+atan((2*x-1)/sqrt(3))/sqrt(3)+log(x+1)/3\n(-log(x^2-x+1)/6)+atan((2*x-1)/sqrt(3))/sqrt(3)+log(x+1)/3\n",
    "preset_label": "Hermite Rational Decomposition"
  },
  "sin(x)^3": {
    "input": "sin(x)^3",
    "variable": "x",
    "command": "integrate(sin(x)^3, x)",
    "final_result": "cos(x)^3/3-cos(x)",
    "algorithm": {
      "aic": "ALG-TRIGINT",
      "name": "Trigonometric Substitution",
      "priority": 40,
      "description": "Transformed trig powers into polynomial u-substitution and re-entered integrator."
    },
    "attempted_heuristics": [
      "diffdiv (Derivative-Divides: Failed)"
    ],
    "details": [
      "trigint transformed trigonometric integrand to: cos(x)^3/3-cos(x)",
      "diffdiv evaluated: g492^3/3"
    ],
    "call_tree_text": "\u2022 [sinint] args: [sin(x)^3,x] -> cos(x)^3/3-cos(x)\n  \u2022 [integrator] args: [sin(x)^3,x] -> cos(x)^3/3-cos(x)\n    \u2022 [diffdiv] args: [sin(x)^3,x] -> false\n    \u2022 [trigint] args: [sin(x)^3,x] -> cos(x)^3/3-cos(x)\n      \u2022 [integrator] args: [g492^2-1,g492] -> g492^3/3-g492\n        \u2022 [integrator] args: [-1,g492] -> -g492\n        \u2022 [integrator] args: [g492^2,g492] -> g492^3/3\n          \u2022 [diffdiv] args: [g492^2,g492] -> g492^3/3",
    "call_tree": [
      {
        "func": "sinint",
        "depth": 0,
        "args": "[sin(x)^3,x]",
        "result": "cos(x)^3/3-cos(x)",
        "children": [
          {
            "func": "integrator",
            "depth": 1,
            "args": "[sin(x)^3,x]",
            "result": "cos(x)^3/3-cos(x)",
            "children": [
              {
                "func": "diffdiv",
                "depth": 2,
                "args": "[sin(x)^3,x]",
                "result": "false",
                "children": []
              },
              {
                "func": "trigint",
                "depth": 2,
                "args": "[sin(x)^3,x]",
                "result": "cos(x)^3/3-cos(x)",
                "children": [
                  {
                    "func": "integrator",
                    "depth": 3,
                    "args": "[g492^2-1,g492]",
                    "result": "g492^3/3-g492",
                    "children": [
                      {
                        "func": "integrator",
                        "depth": 4,
                        "args": "[-1,g492]",
                        "result": "-g492",
                        "children": []
                      },
                      {
                        "func": "integrator",
                        "depth": 4,
                        "args": "[g492^2,g492]",
                        "result": "g492^3/3",
                        "children": [
                          {
                            "func": "diffdiv",
                            "depth": 5,
                            "args": "[g492^2,g492]",
                            "result": "g492^3/3",
                            "children": []
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "raw_output": "display2d:false\nfalse\ntrace(sinint,integrator,diffdiv,ratint,trigint,rischint)\n[sinint,integrator,diffdiv,ratint,trigint,rischint]\nintegrate(sin(x)^3,x)\n1 Enter sinint [sin(x)^3,x]\n 1 Enter integrator [sin(x)^3,x]\n  1 Enter diffdiv [sin(x)^3,x]\n  1 Exit  diffdiv false\n  1 Enter trigint [sin(x)^3,x]\n   2 Enter integrator [g492^2-1,g492]\n    3 Enter integrator [-1,g492]\n    3 Exit  integrator -g492\n    3 Enter integrator [g492^2,g492]\n     1 Enter diffdiv [g492^2,g492]\n     1 Exit  diffdiv g492^3/3\n    3 Exit  integrator g492^3/3\n   2 Exit  integrator g492^3/3-g492\n  1 Exit  trigint cos(x)^3/3-cos(x)\n 1 Exit  integrator cos(x)^3/3-cos(x)\n1 Exit  sinint cos(x)^3/3-cos(x)\ncos(x)^3/3-cos(x)\n",
    "preset_label": "Trigonometric Substitution"
  },
  "exp(x)/x": {
    "input": "exp(x) / x",
    "variable": "x",
    "command": "integrate(exp(x) / x, x)",
    "final_result": "-gamma_incomplete(0,-x)",
    "algorithm": {
      "aic": "ALG-SPECIAL-GAMMA",
      "name": "Incomplete Gamma Special Function",
      "description": "Non-elementary integral represented in terms of incomplete gamma special function."
    },
    "attempted_heuristics": [
      "diffdiv (Derivative-Divides: Failed)",
      "rischint (Risch Algorithm: Non-Elementary Proved)"
    ],
    "details": [],
    "call_tree_text": "\u2022 [sinint] args: [%e^x/x,x] -> -gamma_incomplete(0,-x)\n  \u2022 [integrator] args: [%e^x/x,x] -> -gamma_incomplete(0,-x)\n    \u2022 [diffdiv] args: [%e^x/x,x] -> false\n    \u2022 [rischint] args: [%e^x/x,x] -> 'integrate(%e^x/x,x)",
    "call_tree": [
      {
        "func": "sinint",
        "depth": 0,
        "args": "[%e^x/x,x]",
        "result": "-gamma_incomplete(0,-x)",
        "children": [
          {
            "func": "integrator",
            "depth": 1,
            "args": "[%e^x/x,x]",
            "result": "-gamma_incomplete(0,-x)",
            "children": [
              {
                "func": "diffdiv",
                "depth": 2,
                "args": "[%e^x/x,x]",
                "result": "false",
                "children": []
              },
              {
                "func": "rischint",
                "depth": 2,
                "args": "[%e^x/x,x]",
                "result": "'integrate(%e^x/x,x)",
                "children": []
              }
            ]
          }
        ]
      }
    ],
    "raw_output": "display2d:false\nfalse\ntrace(sinint,integrator,diffdiv,ratint,trigint,rischint)\n[sinint,integrator,diffdiv,ratint,trigint,rischint]\nintegrate(exp(x)/x,x)\n1 Enter sinint [%e^x/x,x]\n 1 Enter integrator [%e^x/x,x]\n  1 Enter diffdiv [%e^x/x,x]\n  1 Exit  diffdiv false\n  1 Enter rischint [%e^x/x,x]\n  1 Exit  rischint 'integrate(%e^x/x,x)\n 1 Exit  integrator -gamma_incomplete(0,-x)\n1 Exit  sinint -gamma_incomplete(0,-x)\n-gamma_incomplete(0,-x)\n",
    "preset_label": "Non-Elementary Risch Proof"
  },
  "x/(x^2+1)": {
    "input": "x / (x^2 + 1)",
    "variable": "x",
    "command": "integrate(x / (x^2 + 1), x)",
    "final_result": "log(x^2+1)/2",
    "algorithm": {
      "aic": "ALG-HEUR-DIFFDIV",
      "name": "Derivative-Divides Heuristic",
      "priority": 10,
      "description": "Solved by detecting f(u(x)) * u'(x) pattern substitution directly."
    },
    "attempted_heuristics": [],
    "details": [
      "diffdiv evaluated: log(x^2+1)/2"
    ],
    "call_tree_text": "\u2022 [sinint] args: [x/(x^2+1),x] -> log(x^2+1)/2\n  \u2022 [integrator] args: [x/(x^2+1),x] -> log(x^2+1)/2\n    \u2022 [diffdiv] args: [x/(x^2+1),x] -> log(x^2+1)/2",
    "call_tree": [
      {
        "func": "sinint",
        "depth": 0,
        "args": "[x/(x^2+1),x]",
        "result": "log(x^2+1)/2",
        "children": [
          {
            "func": "integrator",
            "depth": 1,
            "args": "[x/(x^2+1),x]",
            "result": "log(x^2+1)/2",
            "children": [
              {
                "func": "diffdiv",
                "depth": 2,
                "args": "[x/(x^2+1),x]",
                "result": "log(x^2+1)/2",
                "children": []
              }
            ]
          }
        ]
      }
    ],
    "raw_output": "display2d:false\nfalse\ntrace(sinint,integrator,diffdiv,ratint,trigint,rischint)\n[sinint,integrator,diffdiv,ratint,trigint,rischint]\nintegrate(x/(x^2+1),x)\n1 Enter sinint [x/(x^2+1),x]\n 1 Enter integrator [x/(x^2+1),x]\n  1 Enter diffdiv [x/(x^2+1),x]\n  1 Exit  diffdiv log(x^2+1)/2\n 1 Exit  integrator log(x^2+1)/2\n1 Exit  sinint log(x^2+1)/2\nlog(x^2+1)/2\n",
    "preset_label": "Logarithmic Integral"
  },
  "1/(x^4+1)": {
    "input": "1 / (x^4 + 1)",
    "variable": "x",
    "command": "integrate(1 / (x^4 + 1), x)",
    "final_result": "+atan((2*x-sqrt(2))/sqrt(2))/2^(3/2)",
    "algorithm": {
      "aic": "ALG-CASCADE-GENERIC",
      "name": "Moses Integration Cascade (Generic)",
      "description": "Solved by general integration heuristics."
    },
    "attempted_heuristics": [
      "diffdiv (Derivative-Divides: Failed)"
    ],
    "details": [],
    "call_tree_text": "\u2022 [sinint] args: [1/(x^4+1),x]\n  \u2022 [integrator] args: [1/(x^4+1),x]\n    \u2022 [diffdiv] args: [1/(x^4+1),x] -> false\n    \u2022 [ratint] args: [1/(x^4+1),x]\n      \u2022 [ratint] args: [1/((x^2-sqrt(2)*x+1)*(x^2+sqrt(2)*x+1)),x]",
    "call_tree": [
      {
        "func": "sinint",
        "depth": 0,
        "args": "[1/(x^4+1),x]",
        "result": null,
        "children": [
          {
            "func": "integrator",
            "depth": 1,
            "args": "[1/(x^4+1),x]",
            "result": null,
            "children": [
              {
                "func": "diffdiv",
                "depth": 2,
                "args": "[1/(x^4+1),x]",
                "result": "false",
                "children": []
              },
              {
                "func": "ratint",
                "depth": 2,
                "args": "[1/(x^4+1),x]",
                "result": null,
                "children": [
                  {
                    "func": "ratint",
                    "depth": 3,
                    "args": "[1/((x^2-sqrt(2)*x+1)*(x^2+sqrt(2)*x+1)),x]",
                    "result": null,
                    "children": []
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "raw_output": "display2d:false\nfalse\ntrace(sinint,integrator,diffdiv,ratint,trigint,rischint)\n[sinint,integrator,diffdiv,ratint,trigint,rischint]\nintegrate(1/(x^4+1),x)\n1 Enter sinint [1/(x^4+1),x]\n 1 Enter integrator [1/(x^4+1),x]\n  1 Enter diffdiv [1/(x^4+1),x]\n  1 Exit  diffdiv false\n  1 Enter ratint [1/(x^4+1),x]\n   2 Enter ratint [1/((x^2-sqrt(2)*x+1)*(x^2+sqrt(2)*x+1)),x]\n   2 Exit  ratint \n   log(x^2+sqrt(2)*x+1)/2^(5/2)-log(x^2-sqrt(2)*x+1)/2^(5/2)\n                               +atan((2*x+sqrt(2))/sqrt(2))/2^(3/2)\n                               +atan((2*x-sqrt(2))/sqrt(2))/2^(3/2)\n  1 Exit  ratint \n  log(x^2+sqrt(2)*x+1)/2^(5/2)-log(x^2-sqrt(2)*x+1)/2^(5/2)\n                              +atan((2*x+sqrt(2))/sqrt(2))/2^(3/2)\n                              +atan((2*x-sqrt(2))/sqrt(2))/2^(3/2)\n 1 Exit  integrator \n log(x^2+sqrt(2)*x+1)/2^(5/2)-log(x^2-sqrt(2)*x+1)/2^(5/2)\n                             +atan((2*x+sqrt(2))/sqrt(2))/2^(3/2)\n                             +atan((2*x-sqrt(2))/sqrt(2))/2^(3/2)\n1 Exit  sinint \nlog(x^2+sqrt(2)*x+1)/2^(5/2)-log(x^2-sqrt(2)*x+1)/2^(5/2)\n                            +atan((2*x+sqrt(2))/sqrt(2))/2^(3/2)\n                            +atan((2*x-sqrt(2))/sqrt(2))/2^(3/2)\nlog(x^2+sqrt(2)*x+1)/2^(5/2)-log(x^2-sqrt(2)*x+1)/2^(5/2)\n                            +atan((2*x+sqrt(2))/sqrt(2))/2^(3/2)\n                            +atan((2*x-sqrt(2))/sqrt(2))/2^(3/2)\n",
    "preset_label": "Quartic Partial Fractions"
  },
  "1/sqrt(x^2+1)": {
    "input": "1 / sqrt(x^2 + 1)",
    "variable": "x",
    "command": "integrate(1 / sqrt(x^2 + 1), x)",
    "final_result": "asinh(x)",
    "algorithm": {
      "aic": "ALG-CASCADE-GENERIC",
      "name": "Moses Integration Cascade (Generic)",
      "description": "Solved by general integration heuristics."
    },
    "attempted_heuristics": [
      "diffdiv (Derivative-Divides: Failed)"
    ],
    "details": [],
    "call_tree_text": "\u2022 [sinint] args: [1/sqrt(x^2+1),x] -> asinh(x)\n  \u2022 [integrator] args: [1/sqrt(x^2+1),x] -> asinh(x)\n    \u2022 [diffdiv] args: [1/sqrt(x^2+1),x] -> false",
    "call_tree": [
      {
        "func": "sinint",
        "depth": 0,
        "args": "[1/sqrt(x^2+1),x]",
        "result": "asinh(x)",
        "children": [
          {
            "func": "integrator",
            "depth": 1,
            "args": "[1/sqrt(x^2+1),x]",
            "result": "asinh(x)",
            "children": [
              {
                "func": "diffdiv",
                "depth": 2,
                "args": "[1/sqrt(x^2+1),x]",
                "result": "false",
                "children": []
              }
            ]
          }
        ]
      }
    ],
    "raw_output": "display2d:false\nfalse\ntrace(sinint,integrator,diffdiv,ratint,trigint,rischint)\n[sinint,integrator,diffdiv,ratint,trigint,rischint]\nintegrate(1/sqrt(x^2+1),x)\n1 Enter sinint [1/sqrt(x^2+1),x]\n 1 Enter integrator [1/sqrt(x^2+1),x]\n  1 Enter diffdiv [1/sqrt(x^2+1),x]\n  1 Exit  diffdiv false\n 1 Exit  integrator asinh(x)\n1 Exit  sinint asinh(x)\nasinh(x)\n",
    "preset_label": "Radical / Hyperbolic Substitution"
  },
  "cos(x)^4": {
    "input": "cos(x)^4",
    "variable": "x",
    "command": "integrate(cos(x)^4, x)",
    "final_result": "((sin(4*x)/2+2*x)/8+sin(2*x)/2+x/2)/2",
    "algorithm": {
      "aic": "ALG-TRIGINT",
      "name": "Trigonometric Substitution",
      "priority": 40,
      "description": "Transformed trig powers into polynomial u-substitution and re-entered integrator."
    },
    "attempted_heuristics": [
      "diffdiv (Derivative-Divides: Failed)",
      "diffdiv (Derivative-Divides: Failed)"
    ],
    "details": [
      "trigint transformed trigonometric integrand to: ((sin(4*x)/2+2*x)/8+sin(2*x)/2+x/2)/2",
      "diffdiv evaluated: (sin(2*x)/2+x)/8+sin(x)/2+x/4",
      "diffdiv evaluated: sin(x)",
      "trigint transformed trigonometric integrand to: (sin(2*x)/2+x)/2",
      "diffdiv evaluated: sin(x)"
    ],
    "call_tree_text": "\u2022 [sinint] args: [cos(x)^4,x] -> ((sin(4*x)/2+2*x)/8+sin(2*x)/2+x/2)/2\n  \u2022 [integrator] args: [cos(x)^4,x] -> ((sin(4*x)/2+2*x)/8+sin(2*x)/2+x/2)/2\n    \u2022 [diffdiv] args: [cos(x)^4,x] -> false\n    \u2022 [trigint] args: [cos(x)^4,x] -> ((sin(4*x)/2+2*x)/8+sin(2*x)/2+x/2)/2\n      \u2022 [integrator] args: [(cos(x)/2+1/2)^2,x] -> (sin(2*x)/2+x)/8+sin(x)/2+x/4\n        \u2022 [diffdiv] args: [(cos(x)/2+1/2)^2,x] -> (sin(2*x)/2+x)/8+sin(x)/2+x/4\n          \u2022 [integrator] args: [cos(x)^2/4+cos(x)/2+1/4,x] -> (sin(2*x)/2+x)/8+sin(x)/2+x/4\n            \u2022 [integrator] args: [1/4,x] -> x/4\n            \u2022 [integrator] args: [cos(x)/2,x] -> sin(x)/2\n              \u2022 [diffdiv] args: [cos(x),x] -> sin(x)\n            \u2022 [integrator] args: [cos(x)^2/4,x] -> (sin(2*x)/2+x)/8\n              \u2022 [diffdiv] args: [cos(x)^2,x] -> false\n              \u2022 [trigint] args: [cos(x)^2,x] -> (sin(2*x)/2+x)/2\n                \u2022 [integrator] args: [cos(x)/2+1/2,x] -> sin(x)/2+x/2\n                  \u2022 [integrator] args: [1/2,x] -> x/2\n                  \u2022 [integrator] args: [cos(x)/2,x] -> sin(x)/2\n                    \u2022 [diffdiv] args: [cos(x),x] -> sin(x)",
    "call_tree": [
      {
        "func": "sinint",
        "depth": 0,
        "args": "[cos(x)^4,x]",
        "result": "((sin(4*x)/2+2*x)/8+sin(2*x)/2+x/2)/2",
        "children": [
          {
            "func": "integrator",
            "depth": 1,
            "args": "[cos(x)^4,x]",
            "result": "((sin(4*x)/2+2*x)/8+sin(2*x)/2+x/2)/2",
            "children": [
              {
                "func": "diffdiv",
                "depth": 2,
                "args": "[cos(x)^4,x]",
                "result": "false",
                "children": []
              },
              {
                "func": "trigint",
                "depth": 2,
                "args": "[cos(x)^4,x]",
                "result": "((sin(4*x)/2+2*x)/8+sin(2*x)/2+x/2)/2",
                "children": [
                  {
                    "func": "integrator",
                    "depth": 3,
                    "args": "[(cos(x)/2+1/2)^2,x]",
                    "result": "(sin(2*x)/2+x)/8+sin(x)/2+x/4",
                    "children": [
                      {
                        "func": "diffdiv",
                        "depth": 4,
                        "args": "[(cos(x)/2+1/2)^2,x]",
                        "result": "(sin(2*x)/2+x)/8+sin(x)/2+x/4",
                        "children": [
                          {
                            "func": "integrator",
                            "depth": 5,
                            "args": "[cos(x)^2/4+cos(x)/2+1/4,x]",
                            "result": "(sin(2*x)/2+x)/8+sin(x)/2+x/4",
                            "children": [
                              {
                                "func": "integrator",
                                "depth": 6,
                                "args": "[1/4,x]",
                                "result": "x/4",
                                "children": []
                              },
                              {
                                "func": "integrator",
                                "depth": 6,
                                "args": "[cos(x)/2,x]",
                                "result": "sin(x)/2",
                                "children": [
                                  {
                                    "func": "diffdiv",
                                    "depth": 7,
                                    "args": "[cos(x),x]",
                                    "result": "sin(x)",
                                    "children": []
                                  }
                                ]
                              },
                              {
                                "func": "integrator",
                                "depth": 6,
                                "args": "[cos(x)^2/4,x]",
                                "result": "(sin(2*x)/2+x)/8",
                                "children": [
                                  {
                                    "func": "diffdiv",
                                    "depth": 7,
                                    "args": "[cos(x)^2,x]",
                                    "result": "false",
                                    "children": []
                                  },
                                  {
                                    "func": "trigint",
                                    "depth": 7,
                                    "args": "[cos(x)^2,x]",
                                    "result": "(sin(2*x)/2+x)/2",
                                    "children": [
                                      {
                                        "func": "integrator",
                                        "depth": 8,
                                        "args": "[cos(x)/2+1/2,x]",
                                        "result": "sin(x)/2+x/2",
                                        "children": [
                                          {
                                            "func": "integrator",
                                            "depth": 9,
                                            "args": "[1/2,x]",
                                            "result": "x/2",
                                            "children": []
                                          },
                                          {
                                            "func": "integrator",
                                            "depth": 9,
                                            "args": "[cos(x)/2,x]",
                                            "result": "sin(x)/2",
                                            "children": [
                                              {
                                                "func": "diffdiv",
                                                "depth": 10,
                                                "args": "[cos(x),x]",
                                                "result": "sin(x)",
                                                "children": []
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "raw_output": "display2d:false\nfalse\ntrace(sinint,integrator,diffdiv,ratint,trigint,rischint)\n[sinint,integrator,diffdiv,ratint,trigint,rischint]\nintegrate(cos(x)^4,x)\n1 Enter sinint [cos(x)^4,x]\n 1 Enter integrator [cos(x)^4,x]\n  1 Enter diffdiv [cos(x)^4,x]\n  1 Exit  diffdiv false\n  1 Enter trigint [cos(x)^4,x]\n   2 Enter integrator [(cos(x)/2+1/2)^2,x]\n    1 Enter diffdiv [(cos(x)/2+1/2)^2,x]\n     3 Enter integrator [cos(x)^2/4+cos(x)/2+1/4,x]\n      4 Enter integrator [1/4,x]\n      4 Exit  integrator x/4\n      4 Enter integrator [cos(x)/2,x]\n       2 Enter diffdiv [cos(x),x]\n       2 Exit  diffdiv sin(x)\n      4 Exit  integrator sin(x)/2\n      4 Enter integrator [cos(x)^2/4,x]\n       2 Enter diffdiv [cos(x)^2,x]\n       2 Exit  diffdiv false\n       2 Enter trigint [cos(x)^2,x]\n        5 Enter integrator [cos(x)/2+1/2,x]\n         6 Enter integrator [1/2,x]\n         6 Exit  integrator x/2\n         6 Enter integrator [cos(x)/2,x]\n          2 Enter diffdiv [cos(x),x]\n          2 Exit  diffdiv sin(x)\n         6 Exit  integrator sin(x)/2\n        5 Exit  integrator sin(x)/2+x/2\n       2 Exit  trigint (sin(2*x)/2+x)/2\n      4 Exit  integrator (sin(2*x)/2+x)/8\n     3 Exit  integrator (sin(2*x)/2+x)/8+sin(x)/2+x/4\n    1 Exit  diffdiv (sin(2*x)/2+x)/8+sin(x)/2+x/4\n   2 Exit  integrator (sin(2*x)/2+x)/8+sin(x)/2+x/4\n  1 Exit  trigint ((sin(4*x)/2+2*x)/8+sin(2*x)/2+x/2)/2\n 1 Exit  integrator ((sin(4*x)/2+2*x)/8+sin(2*x)/2+x/2)/2\n1 Exit  sinint ((sin(4*x)/2+2*x)/8+sin(2*x)/2+x/2)/2\n((sin(4*x)/2+2*x)/8+sin(2*x)/2+x/2)/2\n",
    "preset_label": "Higher-Order Even Trig Reduction"
  }
};
