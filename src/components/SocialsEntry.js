const SocialsEntry = ({background, link, text, icon}) => {
    return ( 
        <li className={'w-[160px] h-[60px] flex justify-between items-center ml-[-102px] hover:ml-[-10px] duration-300 bg-[' + background + ']'}>
            <a className="flex justify-between items-center w-full" href={link}>{text}{icon}</a>
        </li>
     );
}
 
export default SocialsEntry;