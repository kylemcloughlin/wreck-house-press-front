import Head from 'next/head'
import Image from 'next/image'
export default function Article({title, data}) {
//  let state = useAppContext();
//  console.log(test)
  // console.log(state);
  console.log(data)
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
      
         <Image
        //  src='https://lh3.googleusercontent.com/nTDB1oJoZo9xJKH0IwJ8mOekj_Y7aInpE_9k6l67YojNRELVFa7oYHXIozkENgm2-YBPYNyO0IjTixJSIRKpCQceItwVk-d_ChkZSwuqrZwazN_3Hua8--gEZ8EiIFCeFIBN970Xx99oQHhb6Lpsz1FA7LNXtUp3S4z3cA42NJPS_0OhFUmAV9oopHOejFZHsOYo6mhd5OAvTfhDbYCpInb1Zpq-aDeKgxNZDDdcrgH2n8JJfC31w6XK_awdEVuJp7F2RHYjbYV9MnTTjhwMcfyt4YjSx_4F32J_ukiq7qc9hb49t-HPTtygiESWpV5qB0qLd01Xytl8vP0OukZaR8RpVgbNaDL8b8KTtcJUNF50jQ9eauI1bSwUmQrx3TX_kEFB2Bn6nfAelk46BXNmxuMsh2W4a9Tbhr7BF158xOMDuI_-3u093KJqsL69iC4UWJYdQZi_UX8pMHPepoftltjpZfLsJ7KEaRzyzhGtJNjTIDINTZe5DCKptXf2FPWx-LY8_YJU5y27uRQQicBL0DYiO5F5kvnio7mKUUSn7WZjYBB2K2s9SGT2iWu_hgR6jDm38w2I-CtloeNB8Z_gIjMuQ5Y4fO783IrezZYpJV8MikTdg8hOQiLjWPyy_oE55f9-_vVdTxpJ7K39Wk4RXr9QvO5Nx80iVuncWKyRfT36gQjCrH0UmGZj-da1=w901-h504-no?authuser=0'
        src={data.photos}
        alt="Picture of the author"
        layout="responsive"
        width={500}
        height={500}
      />
        <h1>
          {data.title}
        </h1>
         <h2>
          {data.subtitle}
        </h2>
        <h5>by {data.author}</h5>
        <h5>by {data.photos}</h5>

        <div>
          <p>
            {data.body}
          </p>
        </div>
      </main>
    </div>
  )
}
