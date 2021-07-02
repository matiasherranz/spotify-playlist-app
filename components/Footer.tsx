import Image from 'next/image'

export const Footer = (): JSX.Element => {
  return (
    <>
      <footer>
        <a
          href="https://www.linkedin.com/in/matiasherranz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by Matías Herranz, powered by
          <Image
            src="/nextjs.svg"
            alt="NextJS logo"
            height={'32'}
            width={'64'}
          />
          and ReactJS
          <Image
            src="/react.svg"
            alt="ReactJS logo"
            height={'26'}
            width={'26'}
          />
        </a>
      </footer>

      <style jsx>{`
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
          margin-right: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        * {
          box-sizing: border-box;
        }

        article {
          max-width: 1100px;
          width: 100%;
          min-height: calc(90vh - 50px);
          padding: 10px;
          border-radius: 4px;
          margin: 0 auto;
        }

        article::after {
          content: '';
          clear: both;
          display: block;
        }

        .content {
          float: right;
          width: 74%;
          color: #ccc;
          border-radius: 4px;
          padding: 10px;
          /* height: calc(90vh - 100px); */
        }
      `}</style>
    </>
  )
}

export default Footer
