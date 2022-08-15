export const initialData = {
  boards: [
    {
      id: 'board-1',
      columnOrder: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5'],
      columns: [
        {
          id: 'column-1',
          boardId: 'board-1',
          title: 'To do column',
          cardOrder: ['card-1', 'card-2', 'card-3', 'card-4'],
          cards: [
            {
              id: 'card-1',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 1',
              cover:
                'https://i.pinimg.com/474x/9a/ba/60/9aba6040f5c0af8c93b388f5df24c121.jpg'
            },
            {
              id: 'card-2',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 2',
              cover: null
            },
            {
              id: 'card-3',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 3',
              cover: null
            },
            {
              id: 'card-4',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 4',
              cover: null
            }
          ]
        },
        {
          id: 'column-2',
          boardId: 'board-1',
          title: 'Inprogress column',
          cardOrder: ['card-5', 'card-6'],
          cards: [
            {
              id: 'card-5',
              boardId: 'board-1',
              columnId: 'column-2',
              title: 'Title of card 5',
              cover: null
            },
            {
              id: 'card-6',
              boardId: 'board-1',
              columnId: 'column-2',
              title: 'Title of card 6',
              cover: null
            }
          ]
        },
        {
          id: 'column-3',
          boardId: 'board-1',
          title: 'Done column',
          cardOrder: ['card-7', 'card-8'],
          cards: [
            {
              id: 'card-7',
              boardId: 'board-1',
              columnId: 'column-3',
              title: 'Title of card 7',
              cover: null
            },
            {
              id: 'card-8',
              boardId: 'board-1',
              columnId: 'column-3',
              title: 'Title of card 8',
              cover: null
            }
          ]
        },
        {
          id: 'column-4',
          boardId: 'board-1',
          title: 'Done column',
          cardOrder: ['card-9', 'card-10'],
          cards: [
            {
              id: 'card-9',
              boardId: 'board-1',
              columnId: 'column-4',
              title: 'Title of card 7',
              cover: null
            },
            {
              id: 'card-10',
              boardId: 'board-1',
              columnId: 'column-4',
              title: 'Title of card 8',
              cover: null
            }
          ]
        },
        {
          id: 'column-5',
          boardId: 'board-1',
          title: 'Column',
          cardOrder: [
            'card-11',
            'card-12',
            'card-13',
            'card-14',
            'card-15',
            'card-16'
          ],
          cards: [
            {
              id: 'card-11',
              boardId: 'board-1',
              columnId: 'column-5',
              title: 'Title of card 7',
              cover: null
            },
            {
              id: 'card-12',
              boardId: 'board-1',
              columnId: 'column-5',
              title: 'Title of card 8',
              cover: null
            },
            {
              id: 'card-13',
              boardId: 'board-1',
              columnId: 'column-5',
              title: 'Title of card 7',
              cover: null
            },
            {
              id: 'card-14',
              boardId: 'board-1',
              columnId: 'column-5',
              title: 'Title of card 8',
              cover:
                'https://i.pinimg.com/474x/9a/ba/60/9aba6040f5c0af8c93b388f5df24c121.jpg'
            },
            {
              id: 'card-15',
              boardId: 'board-1',
              columnId: 'column-5',
              title: 'Title of card 7',
              cover: null
            },
            {
              id: 'card-16',
              boardId: 'board-1',
              columnId: 'column-5',
              title: 'Title of card 8',
              cover:
                'https://i.pinimg.com/474x/9a/ba/60/9aba6040f5c0af8c93b388f5df24c121.jpg'
            }
          ]
        }
      ]
    }
  ]
}
