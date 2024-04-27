import { client } from "../../libs/client";
import parse from 'html-react-parser';
import { formatDate } from "../../utility/dateformat";

export default function BlogId({ blogs }) {
    return(
        <main>
            <article>
                <section>
                    <div className="inner-contents">
                        <div className="date-wrap">
                            <p>{formatDate(blogs.date)}</p>
                        </div>                        
                        <div className="title-wrap">
                            <h1>{blogs.title}</h1>
                        </div>
                        <div className="img-wrap">
                            <img src={blogs.eyecatch.url} alt={blogs.title}></img>
                        </div>
                        <div className="main-wrap"
                            dangerouslySetInnerHTML={{
                                __html: `${blogs.content}`,
                            }}                            
                        />
                        <div className="button-wrap">
                            <a href="../">記事一覧ページへ</a>
                        </div>
                    </div>
                </section>
            </article>
        </main>
    )
}

//静的生成のためのパスを指定します
export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: "blogs" });
  
    const paths = data.contents.map((content) => `/blogs/${content.id}`);
    return { paths, fallback: false };
  };
  
// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: "blogs", contentId: id });

    return {
        props: {
        blogs: data,
        },
    };
};