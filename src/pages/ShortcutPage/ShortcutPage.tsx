/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineLink } from 'react-icons/ai';
import { IoIosAdd } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { IProjectData, IShortcutData } from '../../types';
import checkAccess from '../../utils/helpers';
import styles from './ShortcutPage.module.scss';
import addshorcut from '../../assets/addshorcut.svg';
import { ProjectContext, ProjectDispatchContext } from '../../context/ProjectProvider';
import { deleteShortcut } from '../../api/shortcut/shortcut';
import ProjectNavigationV3 from '../../lib/ProjectNavigationV3/ProjectNavigationV3';
import ButtonV2 from '../../lib/FormV2/ButtonV2/ButtonV2';
import InputV2 from '../../lib/FormV2/InputV2/InputV2';
import Modal from '../../lib/Modal/Modal';
import DefaultModalHeader from '../../lib/Modal/ModalHeader/DefaultModalHeader/DefaultModalHeader';
import ShortcutModal from '../../components/Modals/ShortcutModal/ShortcutModal';

export default function ShortcutPage() {
  const { projectId = '' } = useParams();

  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  const projects = useContext(ProjectContext);
  const fetchProjects = useContext(ProjectDispatchContext);
  const [shortcuts, setShortcuts] = useState<any>([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (projects.length === 0) {
      return;
    }
    const result: IProjectData = projects.filter((item) => item.id === projectId)[0];
    setShortcuts(result.shortcut);
  }, [projects]);

  const removeShortCut = (shortcutId: string) => {
    deleteShortcut(projectId, shortcutId).then(() => {
      setShortcuts(shortcuts.filter((item) => item.id !== shortcutId));
      fetchProjects();
    });
  };

  const renderModals = () => {
    return (
      <div>
        {openModal &&
          ReactDOM.createPortal(
            <Modal classesName={[styles.shortcutModal, 'clear'].join(' ')}>
              <DefaultModalHeader
                title="Shortcut"
                onClickClose={() => {
                  setOpenModal(false);
                }}
              />
              <img src={addshorcut} alt="shortcut" className={styles.shortcutImg} />
              <ShortcutModal
                operation={selectedData ? 'Edit' : 'Add'}
                setAddLinkToggle={setOpenModal}
                addLinkToggle={openModal}
                selectedLink={selectedData}
                currentProjectId={projectId}
                shortCutAdded={() => {
                  setOpenModal(false);
                  fetchProjects();
                }}
                shortCutUpdated={fetchProjects}
              />
            </Modal>,
            document.body
          )}
      </div>
    );
  };

  const renderShortcutList = () => {
    const filteredShortcuts = searchInput
      ? shortcuts.filter((item) => item.name.includes(searchInput))
      : shortcuts;

    return (
      <div className={styles.shortcutsLinksContainer}>
        {filteredShortcuts.map((shortcutData: IShortcutData) => {
          return (
            <div
              key={shortcutData.id}
              className={styles.shortcutItem}
              data-testid={`item-${shortcutData.id}`}
            >
              <a
                href={
                  shortcutData.shortcutLink && shortcutData.shortcutLink.includes('https://')
                    ? shortcutData.shortcutLink
                    : `https://${shortcutData.shortcutLink}`
                }
                target="_blank"
                rel="noreferrer"
                data-testid={`shortcut-${shortcutData.id}`}
                className={styles.navBtn}
              >
                <AiOutlineLink className={styles.icon} />
                <span className={styles.shortcutContent}>{shortcutData.name}</span>
                <div className={styles.buttonsContainer}>
                  {checkAccess('edit:shortcut', projectId) && (
                    <ButtonV2
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenModal(!openModal);
                        setSelectedData(shortcutData);
                      }}
                      text="Edit"
                      size="xs"
                      dataTestId={`edit-shortcut-${shortcutData.id}`}
                    />
                  )}
                  {checkAccess('delete:shortcut', projectId) && (
                    <ButtonV2
                      onClick={(e) => {
                        e.preventDefault();
                        if (!shortcutData.id) {
                          return;
                        }
                        removeShortCut(shortcutData.id);
                      }}
                      text="Delete"
                      size="xs"
                      danger
                      dataTestId={`delete-shortcut-${shortcutData.id}`}
                    />
                  )}
                </div>
              </a>
            </div>
          );
        })}
      </div>
    );
  };

  const renderTip = () => {
    return <p className={styles.tip}>Tips: Consider bookmark your links into chrome.</p>;
  };

  const renderSubMenu = () => {
    return (
      <div className={[styles.subMenuContainer, 'flex spaceBetween'].join(' ')}>
        <InputV2
          label="Search"
          onValueChanged={(e) => {
            setSearchInput(e.target.value);
          }}
          defaultValue=""
          name="search"
          classes={styles.searchInput}
          dataTestId="search"
        />
        <div>
          <ButtonV2
            text="ADD LINK"
            onClick={() => {
              setOpenModal(true);
              setSelectedData(null);
            }}
            icon={<IoIosAdd className={styles.createCardIcon} />}
            fill
            dataTestId="add-link"
          />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Shortcut</h1>
      <ProjectNavigationV3 />
      {renderSubMenu()}
      {renderTip()}
      {renderShortcutList()}
      {renderModals()}
    </div>
  );
}
