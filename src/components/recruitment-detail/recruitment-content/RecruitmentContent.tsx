import { post } from '@src/mock/post'
import { markdownStyles } from '@src/styles/markdownStyles'
import ReactMarkdown from 'react-markdown'

const styles = markdownStyles

export default function RecruitmentContent() {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-8 pb-18">
      <h3 className="mb-4 pb-6 text-2xl font-bold">공고 내용</h3>
      <ReactMarkdown
        components={{
          h1: ({ ...props }) => <h1 className={styles.h1} {...props} />,
          h2: ({ ...props }) => <h2 className={styles.h2} {...props} />,
          h3: ({ ...props }) => <h3 className={styles.h3} {...props} />,
          h4: ({ ...props }) => <h4 className={styles.h4} {...props} />,
          h5: ({ ...props }) => <h5 className={styles.h5} {...props} />,
          h6: ({ ...props }) => <h6 className={styles.h6} {...props} />,
          p: ({ ...props }) => <p className={styles.p} {...props} />,
          ul: ({ ...props }) => <ul className={styles.ul} {...props} />,
          ol: ({ ...props }) => <ol className={styles.ol} {...props} />,
          li: ({ ...props }) => <li className={styles.li} {...props} />,
          img: ({ ...props }) => <img className={styles.img} {...props} />,
          blockquote: ({ ...props }) => (
            <blockquote className={styles.blockquote} {...props} />
          ),
          code: (props) => {
            const isInline = !props.className?.includes('language-')
            return isInline ? (
              <code className={styles.code} {...props} />
            ) : (
              <code {...props} />
            )
          },
          pre: ({ ...props }) => <pre className={styles.pre} {...props} />,
          a: ({ ...props }) => <a className={styles.a} {...props} />,
          strong: ({ ...props }) => (
            <strong className={styles.strong} {...props} />
          ),
          em: ({ ...props }) => <em className={styles.em} {...props} />,
          hr: ({ ...props }) => <hr className={styles.hr} {...props} />,
          table: ({ ...props }) => (
            <table className={styles.table} {...props} />
          ),
          th: ({ ...props }) => <th className={styles.th} {...props} />,
          td: ({ ...props }) => <td className={styles.td} {...props} />,
          tr: ({ ...props }) => <tr className={styles.tr} {...props} />,
        }}
      >
        {post.content}
      </ReactMarkdown>
    </div>
  )
}
