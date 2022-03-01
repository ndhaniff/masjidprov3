import React, { useState } from 'react'
import { nav, navCat } from '../routes'
import { Link } from '@inertiajs/inertia-react'
import classNames from 'classnames'

function Admin({ children }) {

  return (
    <div className="flex main-wrapper">
      <nav className="fixed top-0 left-0 w-[240px] h-full drop-shadow-[7px_2px_9px_0px_rgba(0,0,0,0.25)]">
        <div className="sidebar-header h-[60px] flex items-center w-[240px] px-10 py-2 border-r border-b border-slate-200">
          <div className="text-3xl font-semibold">Promasjid</div>
        </div>
        <aside className="sidebar border-r border-slate-200 w-[240] h-[100%] max-h-[calc(100%-60px)]">
          <ul className="px-10 pt-10 pb-12 nav">
            {navCat.map((category, i) => (
              <div key={`nav-cat-${i}`}>
                <li className='text-sm uppercase nav-category text-slate-500'>{category}</li>
                {
                  nav[category].map((menu, i) => (
                    <li key={`nav-item-${i}`} className={`nav-item py-2 mb-2 capitalize`}>
                      <Link href={route(menu.name)} as="a" className={`hover:cursor-pointer flex items-center text-lg before:content-[''] before:block before:absolute before:-ml-10 before:h-[30px] before:border-l-4  ${route().current(menu.name) || route().current().startsWith(menu.name) ? 'active text-sky-600 hover:text-sky-600 before:border-sky-600' : 'text-gray-800 hover:text-gray-900 before:border-white'}`} >
                        <div className='flex items-center justify-between w-full'>
                          <div className="flex">
                            <span className="mr-2">
                              {menu.icon}
                            </span>
                            {menu.text}
                          </div>
                          {menu.hasOwnProperty('subs') && <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="15" height="15"><path fill="none" d="M0 0h24v24H0z" /><path fill="currentColor" d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" /></svg>
                          </span>}
                        </div>
                      </Link>

                      {menu.hasOwnProperty('subs') && route().current().startsWith(menu.name) && (
                        <ul className="h-0 pl-10 mt-2">
                          {menu.subs.map((sub, i) => (
                            <li className="py-1 text-md" key={`sub-item-${i}`}>
                              <Link href={route(sub.name)} as="a" className={classNames({
                                'text-sky-600 hover:text-sky-600': route().current(sub.name),
                                'text-gray-800 hover:text-gray-800': !route().current(sub.name),
                              })}>{sub.text}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))
                }
              </div>
            ))}
          </ul>
        </aside>
      </nav>

      <div className="page-wrapper flex flex-col md:ml-[240px] min-h-[100vh] bg-slate-100 w-[calc(100%-240px)]">
        <nav className="fixed top-0 z-[21] drop-shadow-sm left-[240px] navbar w-full h-[60px] border-b border-slate-200 bg-white"></nav>
        <div className="page-content mt-[60px] p-10">
          {children}
        </div>
        <footer className='bg-white border-t border-slate-300 p-2 fixed bottom-0 left-0 md:left-[240px] text-center w-full md:w-[calc(100vw-240px)]'>
          <div>Dijahit khas oleh <a href="https://mercuweb.com" target="_blank">Mercuweb</a> &copy; {new Date().getFullYear()}</div>
        </footer>
      </div>
    </div >
  )
}

export default Admin