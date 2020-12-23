const MAX_TREES = 75

const stars = []
const trees = []

function init() {
    // generate stars
    for (let i = 0; i < 101; i++) {
        stars.push({
            x: RND(rx(1)),
            y: RND(ry(.55)),
            size: RND(1, 4),
            color: RND(2),
        })
    }

    // generate trees
    for (let i = 0; i < MAX_TREES; i++) {
        const f = (i/MAX_TREES)
        const y = ry(.56) + ry(.45) * (f*f*f)
        trees.push({
            x: RND(rx(1)),
            y: y,
        })
    }
}

function draw() {
    // sky
    background(.65, .4, .15)

    // stars
    stars.forEach((star) => {
        lineWidth(star.size)
        switch(star.color) {
            case 0: fill(.01, .5, .5); break;
            case 1: fill(.15, .5, .5); break;
            case 2: fill(.5,  .5, .5); break;
        }
        plot(star.x, star.y)
    })

    // sun
    fill(.05, .5, .5)
    circle(rx(.75), ry(.5), ry(.1))

    // ground
    fill(.35, .2, .1)
    rect(0, ry(.55), rx(1), ry(.45))

    // horizon
    lineWidth(2)
    stroke(.7, .5, .5)
    line(0, ry(.55), rx(1), ry(.55))

    // forest
    trees.forEach((tree) => {
        const { x, y } = tree
        const range = vmap(ry(.56), ry(1), 0, 1, y, true)
        const scale = .6 + range * 3
        const base = 15 * scale
        const color = hsl(.4, .15, range * .08)

        stroke(color)
        lineWidth(3*scale)
        line(x, y, x, y - base)

        const s = 20 * scale
        let ly = y - base - s
        fill(color)
        triangle(x, ly, x-s, ly+s, x+s, ly+s)
        ly -= s * .8
        triangle(x, ly, x-s, ly+s, x+s, ly+s)
        ly -= s * .8
        triangle(x, ly, x-s, ly+s, x+s, ly+s)
    })
}
