export const
    BRIGHT = 'BRIGHT',
    DIM = 'DIM',
    bright = (id, n) => ({type: BRIGHT, id, n}),
    dim = (id, n) => ({type: DIM, id, n})