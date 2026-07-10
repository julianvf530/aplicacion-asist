

type MenuCardProps = {
    title : string;
    click : () =>  void ;
};

export default function MenuCard({ title,click }: MenuCardProps){
    return (
        <div onClick={ click }>
            <h2> {title} </h2>
        </div>
    )
}
