import React from 'react'

export default function () {
    const items = [
        {
            id: 'greek-salad',
            name: '希腊沙拉',
            itemss: [{ x: '西红柿', y: '黄瓜', v: '洋葱', b: '油橄榄', e: '羊奶酪' }],
        },
        // {
        //   id: 'hawaiian-pizza',
        //   name: '夏威夷披萨',
        //   itemss: ['披萨饼皮', '披萨酱', '马苏里拉奶酪', '火腿', '菠萝'],
        // },
        // {
        //   id: 'hummus',
        //   name: '鹰嘴豆泥',
        //   itemss: ['鹰嘴豆', '橄榄油', '蒜瓣', '柠檬', '芝麻酱'],
        // },
    ];
    const demo2 = [{
        articleid: "64a3e1d1d7687e67a5fadb6d",
        comment: "aa",
        likes: 0,
        _id: "64a3e1bcd7687e67a5fadb6a",
        userid: [{
            name: "demo",
            password: "demo",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGVtbyIsInBhc3N3b3JkIjoiZGVtbyIsImlhdCI6MTY4ODQ2MTc1NiwiZXhwIjoxNjkxMDUzNzU2fQ.jmb4iNFcomW3zpsgOEHUdu7BGYp4OwzI8jgZioFwFXU",
            __v: 0,
           
        }]
    }]
    return (
        <div>
            <div>
                <h1>菜谱</h1>
                {demo2.map(item =>
                    <div key={item._id}>
                        <ul>
                            {item.userid.map(items =>
                                <li key={items}>
                                    {items.name}
                                </li>
                            )}
                        </ul>
                        <h2>{item.comment}</h2>
                    </div>
                )}
            </div>
        </div>
    )
}
