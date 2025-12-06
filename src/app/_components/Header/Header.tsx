import Link from 'next/link'

import { Menu } from '../Menu'

export function Header() {
    return (
        <header>
            <h1><Link href="/">ОГХ</Link></h1>
            <Menu />
        </header>
    )
}
