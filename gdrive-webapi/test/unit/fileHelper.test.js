import { describe, test, expect, jest } from '@jest/globals'
import Routes from './../../src/routes.js'
import fs from 'fs'
import fileHelper from '../../src/fileHelper.js'

describe('#FileHelper', () => {
    
    describe('#getFileStatus', () => {
        
        test('it should return files statuses in correct format', async () => {
            
            const statMock = {
                dev: 2050,
                mode: 33204,
                nlink: 1,
                uid: 1000,
                gid: 1000,
                rdev: 0,
                blksize: 4096,
                ino: 9175051,
                size: 7110,
                blocks: 16,
                atimeMs: 1631107362898.521,
                mtimeMs: 1630496519809.154,
                ctimeMs: 1631107362766.524,
                birthtimeMs: 1631107362766.524,
                atime: '2021-09-08T13:22:42.899Z',
                mtime: '2021-09-01T11:41:59.809Z',
                ctime: '2021-09-08T13:22:42.767Z',
                birthtime: '2021-09-08T13:22:42.767Z'
            }

            const mockUser = 'user'
            process.env.USER = mockUser
            const filename = 'github.png'
            
            jest.spyOn(fs.promises, fs.promises.readdir.name)
                .mockResolvedValue([filename])

            jest.spyOn(fs.promises, fs.promises.stat.name)
                .mockResolvedValue(statMock)
            
            const result = await fileHelper.getFileStatus('/tmp')

            const expectedResult = [
                {
                    size: '7.11 kB',
                    lastModified: statMock.birthtime,
                    owner: mockUser,
                    file: filename
                }
            ]

            expect(fs.promises.stat).toHaveBeenLastCalledWith(`/tmp/${filename}`)
            expect(result).toMatchObject(expectedResult)

        })

    })

})
