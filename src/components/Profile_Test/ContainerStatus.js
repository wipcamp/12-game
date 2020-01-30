import React, { Component } from 'react'
import styles from './Profile.module.css'

const ContainerStatus = (props) => (
    <div className={styles.cstatus}>
        <p>{props.message}</p>
        <p>{props.message}</p>
        <p>{props.message}</p>
        <p>{props.message}</p>
    </div>
)

export default ContainerStatus