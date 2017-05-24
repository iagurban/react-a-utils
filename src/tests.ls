require! {
  './index': {classes, merge-props, split-props}

  lodash: _
  chai: {expect}
}

describe 'main', (___) ->
  it 'classes', !->
    expect classes do
      [0, [\a \o]]
      q: true
      b: false
      t: 0
      s: 1
      [
        \r
        i: true
        y: 'a' # = true
        r: '' # = false
        s: true # duplicating, should not override first 's' in order
      ]
      \n
    .equal "0 a o q s r i y n"

  it 'merge-props', !->
    q = {}

    p =
      style:
        a: 0
      on-click: !-> q.a = true

    p2 = merge-props p,
      * on-click: !-> q.b = true
        style: a: 1, b: 4
        q: 1
      * style: a: 2
        q: 'e'
    p2.on-click!

    expect (q.a and q.b and p2.style.a == 2 and p2.style.b == 4 and p2.q == \e) .equal true

    q = {}

    p2 = merge-props p, on-click: -> q.b = true; false
    p2.on-click!

    expect (not q.a and q.b) .equal true

  it 'failing merge-props', !->
    expect ->
      merge-props do
        * on-click: 123
        * on-click: ->
    .to.throw!

    expect ->
      merge-props do
        * on-click: ->
        * on-click: 123
    .to.throw!

    merge-props do
      * on-click: null
      * on-click: ->

    merge-props do
      * on-click: ->
      * on-click: null

  it 'split-props', !->
    props =
      a: 0
      b: 1
      c: 2
    [internal-props, rest-props] = split-props props, props{a, b}

    expect internal-props.a .equal 0
    expect internal-props.b .equal 1
    expect internal-props.c? .equal false
    expect not rest-props.a? and not rest-props.b? .equal true
    expect rest-props.c .equal 2

